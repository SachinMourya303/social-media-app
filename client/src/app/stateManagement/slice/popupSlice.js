import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addStoryDialogBox: false,
    storyDialogBox: false,
    searchDialogBox: false,
    loader: false,
    rightOutletBox: "chatpage",
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
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setRightOutletBox: (state, action) => {
            state.rightOutletBox = action.payload;
        },
    }
})

export const { setStoryDialogBox, setSearchDialogBox, setAddStoryDialogBox, setLoader , setRightOutletBox } = popupSlice.actions;
export default popupSlice.reducer;