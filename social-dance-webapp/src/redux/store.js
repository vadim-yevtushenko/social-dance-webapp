import authReducer from './reducers/authReducer';
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

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