import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import {gamesReducer} from "../redux/slices/gameSlice";
import {girlsReducer} from "../redux/slices/girlSlice";
import googleApiSlice from "../features/auth/googleApiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [googleApiSlice.reducerPath]: googleApiSlice.reducer,
        auth: authReducer,
        games: gamesReducer,
        girls: girlsReducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,googleApiSlice.middleware),
    devTools: true
})