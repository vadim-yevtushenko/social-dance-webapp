import initialState from "../initialState";
import {DANCER_LOGIN, DANCER_LOGOUT, GET_DANCER} from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, password} = action.payload
            const dancer = action.payload
            const isAuthenticated = (dancer) => Boolean(dancer)
            return {
                ...state,
                email: email,
                password: password,
                isAuthenticated: isAuthenticated,
                dancer: dancer
            }
        case DANCER_LOGOUT:
            return {
                ...initialState().auth
            }
        // case GET_DANCER:
        //     const data = action.payload
        //     return {
        //         ...state,
        //         dancer: data
        //     }
        default:
            return state
    }
}

export default authReducer