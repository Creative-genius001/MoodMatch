import querystring from 'querystring';
import generateRandomStrings from "@/app/utils/generateRandomString";
import { redirect } from 'next/navigation';
import axios from 'axios';
import getLocalStorage from '@/app/utils/getLocalStorage';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URL as string;
const baseURL = process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL as string;


const spotifyRequestWrapper = async (method : string, url: string, data: object | null = null, additionalHeaders: Record<string, string> = {}) => {
    const local = getLocalStorage('access-data')
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
        localStorage.setItem('spotify-id', JSON.stringify(response.id))
        return(response.id)  
    } catch (error) {
        console.error('Error getting SPotify Id', error)
    }
   
}



export async function createPlaylist (name: string, description: string) {
    let userId =  getLocalStorage('spotify-id')
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
