import querystring from 'querystring';
import generateRandomStrings from "@/utils/generateRandomString";
import { redirect } from 'next/navigation';
import axios from 'axios';
import getLocalStorage from '@/utils/getLocalStorage';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const redirect_uri = 'http://localhost:3000/';
const baseURL = 'https://accounts.spotify.com/api/token'


const spotifyRequestWrapper = async (method : string, url: string, data: object | null = null, additionalHeaders: Record<string, string> = {}) => {
    const local = getLocalStorage()
    if(!local) return null
    let accessToken = local.access_token;

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
        accessToken = await getRefreshToken();

        const headers = {
          Authorization: `Bearer ${accessToken}`,
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

  const state = generateRandomStrings(16);
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
    const local = getLocalStorage()
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

    console.log('refresh token data',data)
    localStorage.setItem('access-data', JSON.stringify(data))
    return(data.access_token)

}


export async function getSpotifyId () {

    const url = 'https://api.spotify.com/v1/me';
    const additionalHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    try {
     const response = await spotifyRequestWrapper('get', url, null, additionalHeaders);
        console.log('spotify id',response.id)
        localStorage.setItem('spotify-id', JSON.stringify(response.id))
        return(response.id)  
    } catch (error) {
        console.error('Error getting SPotify Id', error)
    }
   
}



export async function createPlaylist (name: string, description: string) {
    let userId =  JSON.parse(localStorage.getItem('spotify-id'))
    if(!userId) {
        userId = await getSpotifyId()
    }
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
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
    const playlistId = response.id
    return(playlistId)
        
    } catch (error) {
        console.error('Could not create playlist', error)
        return null;
    }

}

export async function addSongsToPlaylist (playlistId: string, songs: string[]) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const data = {
        uris: songs,
        position: 0
    }
    const additionalHeaders = {
        'Content-Type': 'application/json',
    }
    try {
        const response = await spotifyRequestWrapper('post', url, data,  additionalHeaders);
        return (response.snapshot_id)
    } catch (error) {
        console.error('Error adding songs to playlist', error)
    }
}   



const tracks = [
    "spotify:track:2YoHXDX39wVHAz2Ym4mOEA",
    "spotify:track:1n1jOaL7w3zfoE1nbbP1iW",
    "spotify:track:0NIfwBqfHHX7XOCW7sUuTD",
    "spotify:track:1jJci4qxiYcOHhQRcTxdeA",
    "spotify:track:3FtYbEfBqAlGO46NUDQSAt",
    "spotify:track:7Ly3ri0bopwb9vKWyGotgL",
    "spotify:track:5XTbebKhs3YykWVAqNKio3",
    "spotify:track:1QIOqSEi9UXzYO2bE8Cwce",
    "spotify:track:1eyzqe2QqGZUmfcviUDlEV",
    "spotify:track:1sDdiQ1YqI19oL8f3p79c3",
    "spotify:track:278tedtAupj5f9z76rGfEo",
    "spotify:track:6RUKPb4LETWmmr3iAEQktW",
    "spotify:track:24Yi9hE78yPEbVftBmW1sQ",
    "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
    "spotify:track:2uxEmWdDDe9vvOrTXxCq4E",
    "spotify:track:6gBFPUFcJLzWGx4lenP6hW",
    "spotify:track:5aAx2yezTd8zXrkmtKl66Z",
    "spotify:track:0fcP6ZckIMbMY6H5qe9Unq",
    "spotify:track:3bidbhpOYeV4knp8AIu8Xn",
    "spotify:track:038tLCsZBd8yLqYBYoBWnQ"
]

export async function addToPlaylist () {
    const url = `https://api.spotify.com/v1/playlists/4JAa8WlnZrUoCwUN63f9QX/tracks`
    const data = {
        uris: tracks,
        position: 0
    }
    const additionalHeaders = {
        'Content-Type': 'application/json',
    }
    try {
        const response = await spotifyRequestWrapper('post', url, data,  additionalHeaders);
        return (response.snapshot_id)
    } catch (error) {
        console.error('Error adding songs to playlist', error)
    }
}   
