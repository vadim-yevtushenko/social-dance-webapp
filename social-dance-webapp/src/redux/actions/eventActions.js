export const GET_ORGANIZED_EVENTS = "GET_ORGANIZED_EVENTS";

export const getOrganizedEvents = events => ({
    type: GET_ORGANIZED_EVENTS,
    payload: events
})