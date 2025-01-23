import querystring from 'querystring';
import generateRandomStrings from "@/utils/generateRandomString";
import { redirect } from 'next/navigation';
import axios from 'axios';
import getLocalStorage from '@/utils/getLocalStorage';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
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
    console.log(error.error.message)
    console.log(error.error.status)
    if (error.error && error.error.status === 401) {
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

export async function requestAccessToken(state: string, code: string) {
    const payload = {
      url: baseURL,
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    const { url, form, headers } = payload
    await axios.post(url, form, { headers })
        .then(res => {
            const { data } = res;
            localStorage.setItem('atk', JSON.stringify(data))
            getSpotifyId();
        })
        .catch(error => {
            console.error(error.response.data)
            throw error;
        })
    

}


export async function getRefreshToken () {
    const local = getLocalStorage()
    if(!local) return null
    const refreshToken = local.refresh_token;
    const url = baseURL;

    const { data } = await axios({
        method: 'get',
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id
        }
    })

    console.log('refresh token data',data)
    localStorage.setItem('atk', JSON.stringify(data))
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
        localStorage.setItem('sptid', JSON.stringify(response.id))
        return(response.id)  
    } catch (error) {
        console.error('Error getting SPotify Id', error)
    }
   
}



export async function createPlaylist (name: string, description: string) {
    let userId =  JSON.parse(localStorage.getItem('sptid'))
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

export async function addSongsToPlaylist (spotifyId: string, songs: string[]) {
    const url = `https://api.spotify.com/v1/playlists/${spotifyId}/tracks`
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