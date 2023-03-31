import {createSlice} from "@reduxjs/toolkit";

const games = createSlice({
    name: 'games',
    initialState: [
            {id: 1, img: "/gameIcons/dota2-icon.svg", name: 'Dota 2'},
            {id: 2, img: "/gameIcons/LoL.ico", name: 'LOL'},
            {id: 3, img: "/gameIcons/csgo-icon.ico", name: 'CS GO'},
            {id: 4, img: "/gameIcons/fortnite.svg", name: 'Fortnite'},
            {id: 5, img: "/gameIcons/apex-legends.ico", name: 'Apex'},
            {id: 6, img: "/gameIcons/pubg.svg", name: 'PUBG'},
            {id: 7, img: "/gameIcons/question.svg", name: 'Any wish'}
    ],
    reducer: {
        // define your reducers here
    }
});
export const gamesReducer = games.reducer;