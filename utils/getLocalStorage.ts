export default function getLocalStorage(key: string) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}


export  function getSessionStorage(key: string) {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
}
