import initialState from "../initialState";
import {GET_VIEW_OBJECT, GET_LIST} from "../actions/listsActions";

const listsReducer = (
    state = initialState().lists,
    action = {}
) => {
    switch (action.type){
        case GET_LIST:{
            const {results, total} = action.payload
            return {
                ...state,
                results: results,
                total: total
            }
        }
        case GET_VIEW_OBJECT:{
            return {
                ...state,
                viewObject: action.payload
            }
        }
        default:
            return state
    }
}

export default listsReducer