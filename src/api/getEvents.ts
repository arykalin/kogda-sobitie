import httpClient from './httpClient'
import Event from "@/types/Event";
const END_POINT = '/events'

const getEvents = (): Event[] => {
  let response = httpClient.get(`${END_POINT}`);
  let answer;
  httpClient.get(`${END_POINT}`).then((response) => {
    answer = response.data.events.map(event => {
      const newEvent: Event = {
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
    })
    console.log("ccc");
    console.log(answer);
    //return answer;
  });  
  console.log("bbb");
  console.log(answer);
  return answer;
}

export { getEvents }