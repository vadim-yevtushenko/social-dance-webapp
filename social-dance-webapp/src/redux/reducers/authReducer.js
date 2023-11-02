import initialState from "../initialState";
import { DANCER_LOGIN, DANCER_LOGOUT, UPDATE_DANCER } from "../actions/authActions";

const authReducer = (
    state = initialState().auth,
    action = {}
) => {
    switch (action.type){
        case DANCER_LOGIN:
            const {email, isAuth} = action.payload
            return {
                ...state,
                email: email,
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