import httpClient from './httpClient'
import Event from "@/types/Event";

const END_POINT = '/events'

const getEvents = async (): Promise<Event[] | string> => {
    console.debug("getting events from api")
    const answer: Event[] = [];
    try {
        const response = await httpClient.get(`${END_POINT}`)
        // const { data } = await response.data.events;
        console.debug("got response from api: ", response)
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
            console.debug("made new event: ", newEvent);
            answer.push(newEvent)
        })
        console.debug("made answer: ", answer);
    } catch (error: any) {
        if (error) {
            return error.message
        }
    }
    return answer
}

export {getEvents}
