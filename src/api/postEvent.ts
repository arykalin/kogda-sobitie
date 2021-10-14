import httpClient from './httpClient'
import Event from "@/types/Event";

const END_POINT = '/event'

const postEvent = (event: Event): Promise<any> => {
    console.log('constructed event in post: ' + event.description)
    const obj: MyObj = JSON.stringify(event)
    console.log('Posting event: ' + obj)
    return httpClient.post(`${END_POINT}`, obj)
}

export {postEvent}
