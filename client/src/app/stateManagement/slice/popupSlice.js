import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addStoryDialogBox: false,
    storyDialogBox: false,
    searchDialogBox: false,
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setAddStoryDialogBox: (state) => {
            state.addStoryDialogBox = !state.addStoryDialogBox;
        },
        setStoryDialogBox: (state) => {
            state.storyDialogBox = !state.storyDialogBox;
        },
        setSearchDialogBox: (state, action) => {
            if (typeof action.payload === "boolean") {
                state.searchDialogBox = action.payload;
            } else {
                state.searchDialogBox = !state.searchDialogBox;
            }
        },
    }
})

export const { setStoryDialogBox, setSearchDialogBox , setAddStoryDialogBox } = popupSlice.actions;
export default popupSlice.reducer;