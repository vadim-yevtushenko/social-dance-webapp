export const GET_RATING = "GET_RATING";
export const GET_GENERAL_RATING = "GET_GENERAL_RATING";
export const GET_REVIEWS = "GET_REVIEWS";

export const getRating = rating => ({
    type: GET_RATING,
    payload: rating
})

export const getGeneralRating = generalRating => ({
    type: GET_GENERAL_RATING,
    payload: generalRating
})

export const getReviews = reviews => ({
    type: GET_REVIEWS,
    payload: reviews
})