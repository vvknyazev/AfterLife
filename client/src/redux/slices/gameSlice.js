import {createSlice} from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'games',
    initialState: [
            {id: 1, img: "/gameIcons/color/dota2.png", name: 'Dota 2'},
            {id: 2, img: "/gameIcons/color/lol.png", name: 'LOL'},
            {id: 3, img: "/gameIcons/color/cs2.png", name: 'CS2'},
            {id: 4, img: "/gameIcons/color/fortnite.jpg", name: 'Fortnite'},
            {id: 5, img: "/gameIcons/color/pubg.png", name: 'PUBG'},
            // {id: 6, img: "/gameIcons/overwatch.svg", name: 'Overwatch'},
            // {id: 7, img: "/gameIcons/valorant.svg", name: 'Valorant'},
            // {id: 8, img: "/gameIcons/gta.svg", name: 'GTA'},
            // {id: 9, img: "/gameIcons/warzone.svg", name: 'Warzone'}
    ],
    reducer: {
        // define your reducers here
    }
});
export const gamesReducer = gameSlice.reducer;
