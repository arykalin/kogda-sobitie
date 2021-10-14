import httpClient from './httpClient'
import Event from "@/types/Event";

const END_POINT = '/event'

const postEvent = (event: Event): Promise<any> => {
    const token = localStorage.getItem('token')
    const headers = {
        "Token": token
    };
    console.log('using token ' + token)
    const obj: MyObj = JSON.stringify(event)
    console.log('Posting event: ' + obj)
    return httpClient.post(`${END_POINT}`, obj, { headers })
}

export {postEvent}
