import httpClient from './httpClient'
const END_POINT = '/event'

const deleteEvent = (eventID: string): Promise<any> => {
    const token = localStorage.getItem('token')
    const headers = {
        "Token": token
    };
    console.log("running deleteEvent id" + eventID)
    return httpClient.delete(`${END_POINT}/${eventID}`,
        { headers })
}

export { deleteEvent }
