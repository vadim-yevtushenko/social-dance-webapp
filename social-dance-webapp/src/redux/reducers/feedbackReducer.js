import initialState from "../initialState";
import { GET_GENERAL_RATING, GET_RATING, GET_REVIEWS } from "../actions/feedbackActions";

const feedbackReducer = (
    state = initialState().feedback,
    action = {}
) => {
    switch (action.type){
        case GET_RATING:{
            return {
                ...state,
                rating: action.payload
            }
        }
        case GET_GENERAL_RATING:{
            return {
                ...state,
                generalRating: action.payload
            }
        }
        case GET_REVIEWS:{
            return {
                ...state,
                reviews: action.payload
            }
        }
        default:
            return state
    }
}

export default feedbackReducer