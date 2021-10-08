import httpClient from './httpClient'
const END_POINT = '/auth'

const authGoogle = (idToken: string): Promise<any> => {
  return httpClient.post(`${END_POINT}/google`, { idToken })
}

export { authGoogle }
