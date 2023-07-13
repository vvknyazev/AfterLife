import {createSlice} from "@reduxjs/toolkit";

const girlSlice = createSlice({
    name: 'girls',
    initialState: [
        {id: 1, img: "/girls/1.jpeg", name: 'Софья', desc: 'Твоя бывшая - тупая сука', g1:'/gameIcons/dota2-icon.svg', g2:'/gameIcons/LoL.ico', g3:'/gameIcons/fortnite.svg', games:['Dota 2', 'LOL', 'Fortnite']},
        {id: 2, img: "/girls/2.jpeg", name: 'Лана', desc: 'Заработала 700$', g2:'/gameIcons/pubg.svg', g1:'/gameIcons/LoL.ico', g3:'/gameIcons/fortnite.svg',games:['Fortnite', 'PUBG', 'LOL']},
        {id: 3, img: "/girls/3.jpeg", name: 'Тиф', desc: 'Пошёл к черту', g1:'/gameIcons/dota2-icon.svg', g2:'/gameIcons/csgo-icon.ico', g3:'/gameIcons/fortnite.svg', g4:'/gameIcons/apex-legends.ico', games:['Dota 2', 'CS:GO', 'Fortnite', 'Apex']},
        {id: 4, img: "/girls/4.jpeg", name: 'Ходячий треш', desc: 'Оставь норм чаевых, ок 👉👈?', g1:'/gameIcons/LoL.ico', g2:'/gameIcons/fortnite.svg', games:['LOL', 'Fortnite']},
        {id: 5, img: "/girls/5.jpeg", name: 'Катя', desc: 'Для тебя просто KKK 🔥', g1:'/gameIcons/LoL.ico', g2:'/gameIcons/csgo-icon.ico', g3:'/gameIcons/fortnite.svg', games:['LOL', 'CS:GO', 'Fortnite']},
        {id: 6, img: "/girls/5.jpeg", name: 'Маша', desc: 'Одинокий рокер', g1:'/gameIcons/LoL.ico', games:['LOL']},
        {id: 7, img: "/girls/5.jpeg", name: 'Xenaex', desc: 'Я Шарю', g1:'/gameIcons/csgo-icon.ico', g2:'/gameIcons/fortnite.svg', games:['CS:GO', 'Fortnite']},
        // {id: 6, img: "/girls/6.png", name: 'Ксения🦋', desc: '“Какая-то очень интересная фраза”'},
        // {id: 7, img: "/girls/7.png", name: 'Влада', desc: 'Доступна 24/7…….'},
    ],
    reducer: {
        // define your reducers here
    }
});
export const girlsReducer = girlSlice.reducer;