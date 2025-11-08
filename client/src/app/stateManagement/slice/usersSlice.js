import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersData : [],
    isLoading : [],
    Posts : [],
    followers : [],
    following : [],
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
        setPosts : (state , action) => {
            state.Posts = action.payload;
        },
        setFollowers : (state , action) => {
            state.followers = action.payload;
        },
        setFollowing : (state , action) => {
            state.following = action.payload;
        },
    }
})

export const { setUsers , setIsLoading , setFollowers , setFollowing , setUserStoryId} = userSlice.actions;
export default userSlice.reducer;