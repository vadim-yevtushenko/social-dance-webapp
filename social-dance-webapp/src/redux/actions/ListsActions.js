export const GET_EVENTS = "GET_EVENTS";
export const GET_SCHOOLS = "GET_SCHOOLS";
export const GET_DANCERS = "GET_DANCERS";
export const GET_VIEW_OBJECT = "GET_VIEW_OBJECT";

export const getEvents = ({results, total}) => ({
    type: GET_EVENTS,
    payload: {results, total}
})

export const getSchools = ({results, total}) => ({
    type: GET_SCHOOLS,
    payload: {results, total}
})

export const getDancers = ({results, total}) => ({
    type: GET_DANCERS,
    payload: {results, total}
})

export const getViewObject = viewObject => ({
    type: GET_VIEW_OBJECT,
    payload: viewObject
})