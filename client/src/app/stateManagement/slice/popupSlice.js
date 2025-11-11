import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addStoryDialogBox: false,
    storyDialogBox: false,
    searchDialogBox: false,
    loader : false,
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
         setLoader: (state , action) => {
            state.loader = action.payload;
        },
    }
})

export const { setStoryDialogBox, setSearchDialogBox, setAddStoryDialogBox , setLoader } = popupSlice.actions;
export default popupSlice.reducer;