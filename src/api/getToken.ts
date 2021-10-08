import httpClient from './httpClient'
const END_POINT = '/auth'

const getToken = (idToken: string): Promise<any> => {
    console.log("in getToken using token: " + idToken)
    const params = new URLSearchParams()
    params.append('id_token', idToken);
    return httpClient.get(`${END_POINT}`,
        {
        params: params
        })
}

export { getToken }
