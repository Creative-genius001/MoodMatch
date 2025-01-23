export default function getLocalStorage(): LocalStorageProp | null {
    const data = localStorage.getItem('atk')
    if(!data) return null
    const auth = JSON.parse(data);
    return auth
}


type LocalStorageProp = {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
}