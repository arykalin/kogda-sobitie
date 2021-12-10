import httpClient from './httpClient'
const END_POINT = '/auth'

const getAuth = (idToken: string): Promise<any> => {
    console.debug("running getAuth using token: " + idToken)
    const params = new URLSearchParams()
    params.append('id_token', idToken);
    return httpClient.get(`${END_POINT}`,
        {
        params: params
        })
}

export { getAuth }
