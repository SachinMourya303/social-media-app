import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersData : [],  // followers
    isLoading : [],
    followers : [],
    following : [],
    userStoryId : null,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers : (state , action) => {
            state.usersData = action.payload;
        },
        setIsLoading : (state , action) => {
            state.isLoading = action.payload;
        },
        setFollowers : (state , action) => {
            state.followers = action.payload;
        },
        setFollowing : (state , action) => {
            state.following = action.payload;
        },
        setUserStoryId : (state , action) => {
            state.userStoryId = action.payload;
        },
    }
})

export const { setUsers , setIsLoading , setFollowers , setFollowing , setUserStoryId} = userSlice.actions;
export default userSlice.reducer;