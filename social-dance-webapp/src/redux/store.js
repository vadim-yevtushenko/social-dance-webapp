import authReducer from './reducers/authReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import schoolReducer from "./reducers/schoolReducer";
import eventReducer from "./reducers/eventReducer";
import requestReducer from "./reducers/requestReducer";
import listsReducer from "./reducers/listsReducer";
import feedbackReducer from "./reducers/feedbackReducer";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const dancerPersistConfig = {
    key: 'auth',
    storage: storage
    // storage: storageSession
}

const combineReducer = combineReducers({
    auth: authReducer,
    mySchools: schoolReducer,
    myEvents: eventReducer,
    request: requestReducer,
    lists: listsReducer,
    feedback: feedbackReducer,
})

const persistedReducer = persistReducer(persistConfig, combineReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

// const store = createStore(authReducer
//     , compose(applyMiddleware(thunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )
//
// export default store