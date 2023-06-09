import initialState from "../initialState";
import {GET_ORGANIZED_EVENT} from "../actions/eventActions";

const eventReducer = (
    state = initialState().myEvents,
    action = {}
) => {
    switch (action.type){
        case GET_ORGANIZED_EVENT:{
            return {
                ...state,
                organizedEvent: action.payload
            }
        }
        default:
            return state
    }
}

export default eventReducer