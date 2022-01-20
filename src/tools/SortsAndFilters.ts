import moment from 'moment';
import Event from "@/types/Event";

function stringToDateMDY(date): string {
    return moment(date,"DD-MM-YYYY").format("MM-DD-YYYY");
}

function sortByDate(list: Event[], asc: boolean): Event[] {
    return list.sort((fst, snd) => {
        return (new Date(stringToDateMDY(fst.date)).valueOf() - 
                new Date(stringToDateMDY(snd.date)).valueOf()) *
                (asc ? 1 : -1);
    })
}

function getUpToDateEvents(list: Event[]): Event[] {
    return list.filter(event => {
        return new Date(stringToDateMDY(event.date)) >= 
                new Date(moment().format("MM/DD/YYYY"));
    })
}

function getPastEvents(list: Event[]): Event[] {
    return list.filter(event => {
        return new Date(stringToDateMDY(event.date)) < 
                new Date(moment().format("MM/DD/YYYY"));
    })
}

function filterEvents(list: Event[], filter): Event[] {
    console.log("filter is");
    console.log(filter);
    if (filter == []) return list;
    filter.forEach(element => {
        if (element == 'upToDate') list = getUpToDateEvents(list);
        if (element == 'past') list = getPastEvents(list);
    });
    return list;
}

function sortEvents(list: Event[], sort): Event[] {
    console.log("sort is");
    console.log(sort);
    if (sort == 'asc') return sortByDate(list, true);
    if (sort == 'desc') return sortByDate(list, false);
    return list;
}

export {sortEvents, filterEvents}