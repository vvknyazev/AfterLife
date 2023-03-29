import {configureStore} from "@reduxjs/toolkit";
import {gamesReducer} from './slices/games';
import {girlsReducer} from "./slices/girls";

const store = configureStore({
    reducer: {
        games: gamesReducer,
        girls: girlsReducer,
    }
});

export default store;