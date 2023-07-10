import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import {gamesReducer} from "../redux/slices/gameSlice";
import {girlsReducer} from "../redux/slices/girlSlice";
import commonApiSlice from "../features/commonApiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [commonApiSlice.reducerPath]: commonApiSlice.reducer,
        auth: authReducer,
        games: gamesReducer,
        girls: girlsReducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,commonApiSlice.middleware),
    devTools: true
})