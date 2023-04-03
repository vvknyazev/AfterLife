import {configureStore} from "@reduxjs/toolkit";
import {gamesReducer} from './slices/gameSlice';
import {girlsReducer} from "./slices/girlSlice";

const store = configureStore({
    reducer: {
        games: gamesReducer,
        girls: girlsReducer,
    }
});

export default store;