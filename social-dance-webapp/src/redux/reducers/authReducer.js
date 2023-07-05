import initialState from "../initialState";
import {UPDATE_PASSWORD, DANCER_LOGIN, DANCER_LOGOUT, UPDATE_DANCER} from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, password, isAuth} = action.payload
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
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        default:
            return state
    }
}

export default authReducer