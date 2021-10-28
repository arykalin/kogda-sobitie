import httpClient from './httpClient'
import Event from "@/types/Event";

const END_POINT = '/events'

function getEvents(): Event[] {
    console.log("getting events from api")
    const answer: Event[] = [];
    httpClient.get(`${END_POINT}`)
        .then((response) => {
            // console.log("got response from api: ", response)
            response.data.events.map(event => {
                const newEvent: Event = {
                    id: event._id,
                    title: event.title,
                    description: event.description,
                    org: event.org,
                    where: event.where,
                    date: new Date(event.date),
                    duration: event.duration,
                    target: event.target,
                    amount: event.amount,
                    link: event.link,
                };
                // console.log("made new event: ", newEvent);
                answer.push(newEvent)
            })
            // console.log("made answer: ", answer);
        })
        .catch((error) => {
            console.error(`error getting events: ${error}`);
            throw new Error(`error getting events: ${error}`);
        })
    return answer
}

export {getEvents}
