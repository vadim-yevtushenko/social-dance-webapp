import initialState from "../initialState";
import {GET_ADMINISTRATED_SCHOOL} from "../actions/schoolActions";

const schoolReducer = (
    state = initialState().mySchools,
    action = {}
) => {
    switch (action.type){
        case GET_ADMINISTRATED_SCHOOL:
            return {
                ...state,
                administratedSchool: action.payload
            }
        default:
            return state
    }
}

export default schoolReducer