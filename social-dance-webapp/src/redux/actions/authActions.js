import {createAction} from "@reduxjs/toolkit";

export const DANCER_LOGIN = 'DANCER_LOGIN'
export const DANCER_LOGOUT = 'DANCER_LOGOUT'
export const UPDATE_DANCER = 'UPDATE_DANCER'

// Action Creator
export const dancerLogin = (email, password, isAuth ) => ({
    type: DANCER_LOGIN,
    payload: { email, password, isAuth }
})

export const dancerLogout = () => ({
    type: DANCER_LOGOUT
})

// export const userLogout = createAction(DANCER_LOGOUT)

export const updateDancer = dancer => ({
    type: UPDATE_DANCER,
    payload: { dancer }
})