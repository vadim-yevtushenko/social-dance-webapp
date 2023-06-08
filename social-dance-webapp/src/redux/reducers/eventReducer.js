import initialState from "../initialState";
import {GET_ORGANIZED_EVENTS} from "../actions/eventActions";

const eventReducer = (
    state = initialState().myEvents,
    action = {}
) => {
    switch (action.type){
        case GET_ORGANIZED_EVENTS:{
            return {
                ...state,
                organizedEvents: action.payload
            }
        }
        default:
            return state
    }
}

export default eventReducer