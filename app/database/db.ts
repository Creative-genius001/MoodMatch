import { createClient } from '@/app/database/client';
import { IPlaylist, IPlaylistDB } from '../types/type';


export async function savePlaylist (playlist: IPlaylist) {
    const supabase = await createClient();

    const { data: insertedPlaylist, error: playlistError } = await supabase.from("playlists").insert([
    {
      title: playlist.title,
      description: playlist.description,
      genre: playlist.genre,
      number_of_tracks: playlist.numberOfTracks,
      tags: playlist.tags,
      href: playlist.href,
      spotify_id: playlist.spotifyId,
      snapshot_id: playlist.snapshotId,
      generated_at: playlist.generatedAt,
    },
    ]).select().single();

    if (playlistError) {
        console.error(playlistError);
        throw playlistError;
    }

    const songsToInsert = playlist.songs.map((song) => ({
        title: song.title,
        artist: song.artist,
        uri: song.uri,
        link: song.link,
    }));

    const { data: insertedSongs, error: songError } = await supabase
        .from("songs")
        .upsert(songsToInsert, { onConflict: "uri" }) 
        .select();

    if (songError) {
        console.error(songError)
        throw songError
    };

    const relations = insertedSongs.map((song) => ({
        playlist_id: insertedPlaylist.id,
        song_id: song.id,
    }));

    const { error: relationError } = await supabase
    .from("playlist_songs")
    .insert(relations);

    if (relationError) {
        console.error(relationError)
        throw relationError
    };


}

export async function getSinglePlaylist (playlistId: string) {

    const supabase = await createClient();
    const { data, error } = await supabase
    .from("playlists")
    .select(`
        id,
        title,
        description,
        genre,
        number_of_tracks,
        tags,
        href,
        snapshot_id,
        generated_at,
        songs:playlist_songs (
        song:song_id (
            id,
            title,
            artist,
            uri,
            link
        )
        )
    `)
    .eq("id", playlistId)
    .single();

    if (error){
        console.error(error)
        throw error    
    }

    return data;
}

export async function getAllPlaylist (spotifyId: string): Promise<IPlaylist[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from("playlists")
    .select(`
        id,
        title,
        description,
        spotify_id,
        genre,
        number_of_tracks,
        tags,
        href,
        snapshot_id,
        generated_at,
        songs:playlist_songs (
        song:song_id (
            id,
            title,
            artist,
            uri,
            link
        )
        )
    `)
    .eq("spotify_id", spotifyId);

    if (error){
        console.error(error)
        throw error    
    }


    const playlists: IPlaylistDB[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach((item: any) => {
        const playlist: IPlaylistDB = {
            id: item.id,
            title: item.title,
            description: item.description,
            genre: item.genre,
            href: item.href,
            spotifyId: item.spotify_id,
            snapshotId: item.snapshot_id,
            numberOfTracks: item.number_of_tracks,
            tags: item.tags,
            generatedAt: item.generated_at,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            songs: item.songs.map((s: any) => ({
                id: s.song.id,
                title: s.song.title,
                artist: s.song.artist,
                uri: s.song.uri,
                link: s.song.link,
                })),
                } 
        playlists.push(playlist)
    })  

    return playlists;
}