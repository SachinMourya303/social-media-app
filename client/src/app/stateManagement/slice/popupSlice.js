import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    storyDialogBox : false,
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setStoryDialogBox : (state ) => {
            state.storyDialogBox = !state.storyDialogBox;
        }
    }
})

export const { setStoryDialogBox } = popupSlice.actions;
export default popupSlice.reducer;