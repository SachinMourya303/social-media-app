import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersData : [],
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers : (state , action) => {
            state.usersData = action.payload;
        }
    }
})

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;