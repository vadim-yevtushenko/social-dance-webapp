export const GET_DANCERS = 'GET_DANCERS'
export const RESULT_SIZE_CHANGED = 'RESULT_SIZE_CHANGED'
export const PAGE_CHANGED = 'PAGE_CHANGED'
export const SET_LOADING = 'SET_LOADING'

export const getDancerList = dancer => ({
    type: GET_DANCERS,
    payload: dancer
})

export const changeResultSize = size => ({
    type: RESULT_SIZE_CHANGED,
    payload: size
})

export const changePage = page => ({
    type: PAGE_CHANGED,
    payload: page
})

export const setLoading = loading => ({
    type: SET_LOADING,
    payload: loading
})