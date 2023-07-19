import initialState from "../initialState";
import { GET_DANCERS, GET_EVENTS, GET_SCHOOLS, GET_VIEW_OBJECT } from "../actions/ListsActions";

const listsReducer = (
    state = initialState().lists,
    action = {}
) => {
    switch (action.type){
        case GET_EVENTS:{
            const {results, total} = action.payload
            return {
                ...state,
                schools: [],
                dancers: [],
                events: results,
                total: total,
                viewObject: {},
            }
        }
        case GET_SCHOOLS:{
            const {results, total} = action.payload
            return {
                ...state,
                schools: results,
                dancers: [],
                events: [],
                total: total,
                viewObject: {},
            }
        }
        case GET_DANCERS:
            const { results, total } = action.payload
            return {
                ...state,
                schools: [],
                events: [],
                dancers: results,
                total: total,
                viewObject: {},
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