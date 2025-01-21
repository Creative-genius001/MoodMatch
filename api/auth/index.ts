import querystring from 'querystring';
import generateRandomStrings from "@/utils/generateRandomString";
import { redirect } from 'next/navigation';
import axios from 'axios';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/';


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
      url: 'https://accounts.spotify.com/api/token',
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
            const { data, status } = res;
            localStorage.setItem('atk', JSON.stringify(data))
        })
        .catch(error => {
            console.error(error.response.data)
            throw error;
        })
    

}


export async function getRefreshToken () {
    const authData = JSON.parse(localStorage.getItem('atk'))
    const refreshToken = authData.refresh_token;
    const url = "https://accounts.spotify.com/api/token";

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

    console.log(data)

    localStorage.setItem('atk', JSON.stringify(data))
}
