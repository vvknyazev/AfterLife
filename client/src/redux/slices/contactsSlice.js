import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action) {
            state.value = action.payload;
        },
    },
})

export const { setContacts } = contactsSlice.actions
export default contactsSlice.reducer
export const contactsReducer = contactsSlice.reducer;