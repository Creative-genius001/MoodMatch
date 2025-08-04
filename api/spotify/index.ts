import querystring from 'querystring';
import generateRandomStrings from "@/app/utils/generateRandomString";
import { redirect } from 'next/navigation';
import axios from 'axios';
import getLocalStorage from '@/app/utils/getLocalStorage';
import { IPlaylist, PlaylistProp, SongProp } from '@/app/types/type';
import { ValidatedTrack } from '@/app/types/type';
import { savePlaylist } from '@/app/database/db';
import { ITopArtist, ITopSong } from './types/types';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const redirect_uri = 'http://localhost:3000/callback';
const baseURL = process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL as string;
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';


const spotifyRequestWrapper = async (method : string, path: string, data: object | null = null, additionalHeaders: Record<string, string> = {}) => {

  const url = SPOTIFY_BASE_URL+path
  console.log(url)
    const local = getLocalStorage('access-data')
    if(!local) return null
    const accessToken = local.access_token;

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      ...additionalHeaders, 
    };

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error.status === 401) {
      console.log('Access token expired. Refreshing...');

      try {
        const newAccessToken = await getRefreshToken();

        const headers = {
          Authorization: `Bearer ${newAccessToken}`,
          ...additionalHeaders,
        };

        const retryResponse = await axios({
          method,
          url,
          data,
          headers,
        });

        return retryResponse.data;
      } catch (refreshError) {
        console.error('Error refreshing token or retrying request:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('API call failed:', error);
      throw error;
    }
  }
};


export function spotifyAuth() {

  const ID =localStorage.getItem('spotify-id')
  if (ID != null){
    console.log("user already connected")
    return
  }
  const state = generateRandomStrings(16);
  sessionStorage.setItem('stateCode', state)
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read';

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  })}`;

  redirect(spotifyAuthUrl);
 
};

export async function requestAccessToken(code: string) {
    const payload = {
      url: baseURL,
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      },
      json: true
    };

    const { url, form, headers } = payload
    await axios.post(url, form, { headers })
        .then(res => {
            const { data } = res;
            console.log(data)
            localStorage.setItem('access-data', JSON.stringify(data))
            getSpotifyId();
            redirect('/')
        })
        .catch(error => {
            console.error('Could not get access token', error)
            throw error;
        })
    

}


export async function getRefreshToken () {
    const local = getLocalStorage('access-data')
    if(!local) return null
    const refreshToken = local.refresh_token;

    const authOptions = {
        method: 'POST',
        url: baseURL,
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
        data: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    };

    const { data } = await axios.request(authOptions)
    localStorage.setItem('access-data', JSON.stringify(data))
    return(data.access_token)

}


export async function getSpotifyId () {

    const url = '/me';
    const additionalHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    try {
     const response = await spotifyRequestWrapper('get', url, null, additionalHeaders);
        localStorage.setItem('spotify-id', JSON.stringify(response.id))
        return(response.id)  
    } catch (error) {
        console.error('Error getting SPotify Id', error)
        throw error;
    }
   
}



export async function createPlaylist (name: string, description: string): Promise<{playlistID: string, playlistLink: string}> {
    let userId =  getLocalStorage('spotify-id')
    if(!userId) {
        userId = await getSpotifyId()
    }
    const url = `/users/${userId}/playlists`;
    const additionalHeaders = {
        'Content-Type': 'application/json'
    }
    const data = {
            name,
            description,
            public: false
        }

    try {
     
    const response = await spotifyRequestWrapper('post', url, data,  additionalHeaders);
    const playlistID = response.id as string;
    const playlistLink = response.external_urls.spotify as string;
    return({playlistID, playlistLink})
        
    } catch (error) {
        console.error('Could not create playlist', error)
        throw error;
    }

}

export async function addSongsToPlaylist (playlistId: string, uris: string[]) {
    const url = `/playlists/${playlistId}/tracks`
    const data = {
        uris,
    }
    const additionalHeaders = {
        'Content-Type': 'application/json',
    }
    try {
        const response = await spotifyRequestWrapper('post', url, data,  additionalHeaders);
        return (response.snapshot_id)
    } catch (error) {
        console.error('Error adding songs to playlist', error)
        throw error
    }
}   


export async function addPlaylistToSpotify (playlist: PlaylistProp) {
  const validatedTracks = await searchForSongs(playlist.songs).catch((e)=> {throw e})
  
  const validUris = validatedTracks
      .filter((track): track is ValidatedTrack & { uri: string } => track.uri !== null)
      .map((track) => track.uri);

  const validTracks = validatedTracks
      .filter((track): track is ValidatedTrack & { uri: string } => track.uri !== null)
      .map((track) => track);
    
  const {playlistID, playlistLink} = await createPlaylist(playlist.title, playlist.description).catch((e)=> { throw e})
  const snapshotID = await addSongsToPlaylist(playlistID, validUris).catch((e)=> { throw e})

  const playlistFormatted: IPlaylist = {
    title: playlist.title,
    description: playlist.description,
    href: playlistLink,
    tags: playlist.tags,
    snapshotId: snapshotID,
    songs: validTracks,
    genre: playlist.genre,
    numberOfTracks: validTracks.length,
    generatedAt: playlist.generatedAt
  }

  savePlaylist(playlistFormatted)
    
  return ({snapshot_id : snapshotID, playlist_id: playlistID, playlist_link: playlistLink})
}


export async function searchForSongs(songs: SongProp[]): Promise<ValidatedTrack[]> {
  const additionalHeaders = {
    'Content-Type': 'application/json',
  };

  const trackPromises = songs.map(async (song) => {
    const query = `track:"${song.name}" artist:"${song.artist}"`;
    const url = `/search?q=${encodeURIComponent(query)}&type=track&limit=1`;

    try {
      const response = await spotifyRequestWrapper('get', url, null, additionalHeaders);

      if (response.tracks && Array.isArray(response.tracks.items) && response.tracks.items.length > 0) {
        const track = response.tracks.items[0];
        return {
          title: track.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          artist: track.artists.map((a: any) => a.name).join(', '),
          uri: track.uri,
          link: track.href,
        };
      } else {
        console.log({title: song.name, artist: song.artist, error: "Could not get the valid uris and link from spotify"})
        return {
          title: song.name,
          artist: song.artist,
          uri: null,
          link: null,
        };
      }
    } catch (error) {
      console.error(`Failed to search for ${song.name} by ${song.artist}:`, error);
      return {
        title: song.name,
        artist: song.artist,
        uri: null,
        link: null,
      };
    }
  });

  const validatedTracks = await Promise.all(trackPromises);
  return validatedTracks;
}

export async function getUserTopSongs(): Promise<ITopSong[]> {
  const additionalHeaders = {
    'Content-Type': 'application/json',
  };

  const url = '/me/top/tracks?limit=10';

  try {
    const response = await spotifyRequestWrapper('get', url, null, additionalHeaders);
    const topSongs: ITopSong[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.items.forEach((item: any) => {
      const song: ITopSong = {
        name: item.name,
        href: item.external_urls.spotify,
        image: item.album.images[1].url,
        uri: item.uri,
        artist: item.artists[0].name,
      };
      topSongs.push(song);
    });
    return topSongs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserTopArtists(): Promise<ITopArtist[]> {
  const additionalHeaders = {
    'Content-Type': 'application/json',
  };

  const url = '/me/top/artists?limit=10';

  try {
    const response = await spotifyRequestWrapper('get', url, null, additionalHeaders);
    const topArtists: ITopArtist[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.items.forEach((item: any) => {
      const artist: ITopArtist = {
        name: item.name,
        href: item.external_urls.spotify,
        image: item.images[1].url,
        uri: item.uri,
      };
      topArtists.push(artist);
    });
    return topArtists;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
