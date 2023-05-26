import initialState from "../initialState";
import {DANCER_LOGIN, DANCER_LOGOUT} from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, password} = action.payload
            const dancer = action.payload
            const isAuthenticated = dancer != null
            return {
                ...state,
                email: email,
                password: password,
                isAuthenticated: isAuthenticated,
                dancer: dancer
            }
        case DANCER_LOGOUT:
            console.log("LOGOUT")
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