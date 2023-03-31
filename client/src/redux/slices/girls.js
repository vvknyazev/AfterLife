import {createSlice} from "@reduxjs/toolkit";

const girls = createSlice({
    name: 'girls',
    initialState: [
        {id: 1, img: "/girls/1.png", name: 'Софья', desc: 'Твоя бывшая - тупая сука', g1:'/gameIcons/dota2-icon.svg', g2:'/gameIcons/LoL.svg', g3:'/gameIcons/fortnite.svg'},
        {id: 2, img: "/girls/2.png", name: 'Лана', desc: 'Заработала 700$', g2:'/gameIcons/pubg.svg', g1:'/gameIcons/LoL.svg', g3:'/gameIcons/fortnite.svg'},
        {id: 3, img: "/girls/3.png", name: 'Тиф', desc: 'Пошёл к черту', g1:'/gameIcons/dota2-icon.svg', g2:'/gameIcons/csgo-icon.ico', g3:'/gameIcons/fortnite.svg', g4:'/gameIcons/apex-legends.svg'},
        {id: 4, img: "/girls/4.png", name: 'Ходячий треш', desc: 'Оставь норм чаевых, ок 👉👈?', g1:'/gameIcons/LoL.svg', g2:'/gameIcons/fortnite.svg'},
        {id: 5, img: "/girls/5.png", name: 'Катя', desc: 'Для тебя просто KKK 🔥', g1:'/gameIcons/LoL.svg', g2:'/gameIcons/csgo-icon.ico', g3:'/gameIcons/fortnite.svg'},
        {id: 6, img: "/girls/5.png", name: 'Маша', desc: 'Одинокий рокер', g1:'/gameIcons/LoL.svg'},
        {id: 7, img: "/girls/5.png", name: 'Xenaex', desc: 'Я Шарю', g1:'/gameIcons/csgo-icon.ico', g2:'/gameIcons/fortnite.svg'},
        // {id: 6, img: "/girls/6.png", name: 'Ксения🦋', desc: '“Какая-то очень интересная фраза”'},
        // {id: 7, img: "/girls/7.png", name: 'Влада', desc: 'Доступна 24/7…….'},
    ],
    reducer: {
        // define your reducers here
    }
});
export const girlsReducer = girls.reducer;