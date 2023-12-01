import initialState from "../initialState";
import { DANCER_LOGIN, DANCER_LOGOUT, UPDATE_DANCER, UPDATE_TOKEN } from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, token, isAuth} = action.payload
            return {
                ...state,
                email: email,
                token: token,
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
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}

export default authReducer