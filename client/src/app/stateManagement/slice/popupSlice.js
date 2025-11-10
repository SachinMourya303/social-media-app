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
        setAddStoryDialogBox: (state , action) => {
            state.addStoryDialogBox = action.payload;
        },
        setStoryDialogBox: (state) => {
            state.storyDialogBox = !state.storyDialogBox;
        },
        setSearchDialogBox: (state , action) => {
            state.searchDialogBox = action.payload;
        },
    }
})

export const { setStoryDialogBox, setSearchDialogBox, setAddStoryDialogBox } = popupSlice.actions;
export default popupSlice.reducer;