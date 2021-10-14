import httpClient from './httpClient'
import Event from "@/types/Event";

const END_POINT = '/event'

const postEvent = (event: Event): Promise<any> => {
    console.log('Posting event: ' + event)
    return httpClient.post(`${END_POINT}`, {
        event
    })
}

export {postEvent}
