import initialState from "../initialState";
import { LOADING } from "../actions/requestActions";

const stateReducer = (
    state = initialState().request,
    action = {}
) => {
    switch (action.type){
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default stateReducer