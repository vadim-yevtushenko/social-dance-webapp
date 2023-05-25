export const DANCER_LOGIN = 'DANCER_LOGIN'
export const DANCER_LOGOUT = 'DANCER_LOGOUT'
// export const GET_DANCER = 'GET_DANCER'

// Action Creator
export const userLogin = ({ email, password}, dancer ) => ({
    type: DANCER_LOGIN,
    payload: { email, password, dancer }
})

export const userLogout = () => ({
    type: DANCER_LOGOUT
})

// export const getUserData = data => ({
//     type: GET_DANCER,
//     payload: data
// })