import initialState from "../initialState";
import {GET_DANCES} from "../actions/danceAction";

const danceReducer = (
    state = initialState().danceList,
    action = {}
) => {
    switch (action.type){
        case GET_DANCES:
            return {
                ...state,
                dances: action.payload
            }
        default:
            return state
    }
}

export default danceReducer