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
  spotifyId: string,
  snapshotId: string,
  numberOfTracks: number,
  tags: Array<string>,
  songs: Array<ValidatedTrack>
  generatedAt: string
}
