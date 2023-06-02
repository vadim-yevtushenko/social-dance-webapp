import initialState from "../initialState";
import {DANCER_LOGIN, DANCER_LOGOUT, UPDATE_DANCER} from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, password, isAuth} = action.payload
            console.log("authReducer", email)
            return {
                ...state,
                email: email,
                password: password,
                isAuthenticated: isAuth,
            }
        case DANCER_LOGOUT:
            console.log("LOGOUT")
            return {
                ...initialState().auth
            }
        case UPDATE_DANCER:
            return {
                ...state,
                dancer: action.payload
            }
        default:
            return state
    }
}

export default authReducer