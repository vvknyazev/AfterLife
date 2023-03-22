import {configureStore} from "@reduxjs/toolkit";
import {gamesReducer} from './slices/games';

const store = configureStore({
    reducer: {
        games: gamesReducer,
    }
});

export default store;