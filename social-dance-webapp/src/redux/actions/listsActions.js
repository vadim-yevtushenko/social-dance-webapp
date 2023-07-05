export const GET_LIST = "GET_LIST";
export const GET_VIEW_OBJECT = "GET_VIEW_OBJECT";

export const getList = ({results, total}) => ({
    type: GET_LIST,
    payload: {results, total}
})

export const getViewObject = viewObject => ({
    type: GET_VIEW_OBJECT,
    payload: viewObject
})