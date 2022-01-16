import httpClient from './httpClient'
import Event from "@/types/Event";
const END_POINT = '/event'

const putEvent = (eventID: string, event: Event): Promise<any> => {
    const token = localStorage.getItem('token')
    const headers = {
        "Token": token
    };
    const obj = JSON.stringify(event)
    console.debug("running deleteEvent id" + eventID)
    return httpClient.put(`${END_POINT}/${eventID}`, obj,
        { headers })
}

export { putEvent }
