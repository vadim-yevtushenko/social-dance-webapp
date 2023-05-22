import {getResource} from "./request";
import {GET} from "./Endpoints";

export const getEvents = (page, size) => {
    return getResource(GET.getEvents(page, size));
};

export const getEvent = (id) => {
    return getResource(GET.getEvent(id));
}