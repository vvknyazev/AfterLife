import {createSlice} from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'games',
    initialState: [
            {id: 1, img: "/gameIcons/dota2-icon.svg", name: 'Dota 2'},
            {id: 2, img: "/gameIcons/lol.svg", name: 'LOL'},
            {id: 3, img: "/gameIcons/csgo.svg", name: 'CS:GO'},
            {id: 4, img: "/gameIcons/fortnite.svg", name: 'Fortnite'},
            {id: 5, img: "/gameIcons/overwatch.svg", name: 'Overwatch'},
            {id: 6, img: "/gameIcons/pubg.svg", name: 'PUBG'},
            {id: 7, img: "/gameIcons/valorant.svg", name: 'Valorant'},
            {id: 8, img: "/gameIcons/gta.svg", name: 'GTA'},
            {id: 9, img: "/gameIcons/warzone.svg", name: 'Warzone'}
    ],
    reducer: {
        // define your reducers here
    }
});
export const gamesReducer = gameSlice.reducer;