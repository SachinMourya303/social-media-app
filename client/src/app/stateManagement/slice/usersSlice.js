import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersData: [],
    isLoading: [],
    loggedUser: null,
    posts: [],
    followers: [],
    following: [],
    followButtonLoading: false,
    notification: [],
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.usersData = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLoggedUser: (state, action) => {
            state.loggedUser = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setFollowers: (state, action) => {
            state.followers = action.payload;
        },
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        setFollowButtonLoading: (state, action) => {
            state.followButtonLoading = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
    }
})

export const { setUsers, setLoggedUser, setIsLoading, setFollowers, setFollowing, setUserStoryId , setFollowButtonLoading , setNotification , setPosts} = userSlice.actions;
export default userSlice.reducer;