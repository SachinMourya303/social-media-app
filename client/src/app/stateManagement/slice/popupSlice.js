import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addStoryDialogBox: false,
    storyDialogBox: false,
    searchDialogBox: false,
    postDialogBox: false,
    loader: false,
    rightOutletBox: "chatpage",
    activePage: "",
    previewPostBox: false,
    messageId: "",
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setAddStoryDialogBox: (state, action) => {
            state.addStoryDialogBox = action.payload;
        },
        setStoryDialogBox: (state) => {
            state.storyDialogBox = !state.storyDialogBox;
        },
        setSearchDialogBox: (state, action) => {
            state.searchDialogBox = action.payload;
        },
        setPostDialogBox: (state, action) => {
            state.postDialogBox = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setRightOutletBox: (state, action) => {
            state.rightOutletBox = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
         setPreviewPostBox: (state, action) => {
            state.previewPostBox = action.payload;
        },
        setMessageId: (state, action) => {
            state.messageId = action.payload;
        },
    }
})

export const { setStoryDialogBox, setSearchDialogBox, setAddStoryDialogBox, setLoader , setRightOutletBox , setPostDialogBox , setPreviewPostBox , setMessageId , setActivePage } = popupSlice.actions;
export default popupSlice.reducer;