import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.value = action.payload;
        },
    },
})

export const { setOnlineUsers } = onlineUsersSlice.actions
export default onlineUsersSlice.reducer
export const onlineUsersReducer = onlineUsersSlice.reducer;