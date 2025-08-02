export const genres = [
  "Auto Recommend",
  "Gospel",
  "Pop",
  "Hip-Hop/Rap",
  "Rock",
  "R&B/Soul",
  "Electronic/Dance (EDM)",
  "Lo-Fi",
  "Jazz",
  "Acoustic/Folk",
  "Ambient",
  "Classical",
  "Trap",
  "Metal",
  "Techno/House",
  "Reggaeton",
  "Latin",
  "Afrobeats",
  "Reggae",
  "90s Hip-Hop/R&B",
  "70s Disco/Funk",
  "Classic Rock",
  "Oldies (50s/60s)"
];

export const moods = ["Energetic", "Chill", "Focus", "Party", "Melancholic", "Uplifting", "Sad", "Lonely", "Happy"];

export interface ValidatedTrack {
  title: string;
  artist: string;
  uri: string | null;
  link: string | null;
}

export type SongProp = {
  name: string,
  artist: string,
  spotifyURI: string
}

export type PlaylistProp = {
    title: string,
    description: string,
    genre: string,
    numberOfTracks: number,
    tags: Array<string>,
    generatedAt: string,
    songs: Array<SongProp>
}

export interface IPlaylist {
  title: string,
  description: string,
  genre: string,
  href: string,
  snapshotId: string,
  numberOfTracks: number,
  tags: Array<string>,
  songs: Array<ValidatedTrack>
  generatedAt: string
}


export const mockPlaylist: IPlaylist = {
  title: "Vibe & Flow",
  description: "A chill mix of alt-pop and R&B to get lost in.",
  genre: "Alternative",
  href: "https://open.spotify.com/playlist/xyz123",
  snapshotId: "snapshot_001",
  numberOfTracks: 3,
  tags: ["chill", "alt-pop", "evening"],
  songs: [
    {
      title: "Breezeblocks",
      artist: "alt-J",
      uri: "spotify:track:3RkQ3UwOyPqpJiFg88o7UN",
      link: "https://open.spotify.com/track/3RkQ3UwOyPqpJiFg88o7UN"
    },
    {
      title: "Nights",
      artist: "Frank Ocean",
      uri: "spotify:track:3xKsf9qdS1CyvXSMEid6g8",
      link: "https://open.spotify.com/track/3xKsf9qdS1CyvXSMEid6g8"
    },
    {
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      uri: "spotify:track:3B54sVLJ402zGa6Xm4YGNe",
      link: "https://open.spotify.com/track/3B54sVLJ402zGa6Xm4YGNe"
    }
  ],
  generatedAt: new Date().toISOString()
};
