// import initialState from "../initialState";
// import {GET_DANCERS, PAGE_CHANGED, RESULT_SIZE_CHANGED, SET_LOADING} from "../actions/dancerListActions";
//
// const dancerListReducer = (
//     state = initialState().dancerList,
//     action = {}
// ) => {
//     switch (action.type) {
//         case GET_DANCERS:
//             const { results, total } = action.payload
//             return {
//                 ...state,
//                 results: results,
//                 total: total
//             }
//         case RESULT_SIZE_CHANGED:
//             return {
//                 ...state,
//                 size: action.payload
//             }
//         case PAGE_CHANGED:
//             return {
//                 ...state,
//                 page: action.payload
//             }
//         case SET_LOADING:
//             return {
//                 ...state,
//                 loading: action.payload
//             }
//         default:
//             return state
//     }
// }
//
// export default dancerListReducer