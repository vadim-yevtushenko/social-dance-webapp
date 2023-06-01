import initialState from "../initialState";
import {DANCER_LOGIN, DANCER_LOGOUT, UPDATE_DANCER} from "../actions/authActions";

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
                // ...state,
                // email: '',
                // password: '',
                // isAuthenticated: false,
                // dancer: {}
            }
        case UPDATE_DANCER:
            const data = action.payload
            return {
                ...state,
                dancer: data
            }
        default:
            return state
    }
}

export default authReducer