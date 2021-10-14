import httpClient from './httpClient'
const END_POINT = '/events'

const getEvents = (): Promise<any> => {
  return httpClient.get(`${END_POINT}`)
}

export { getEvents }
