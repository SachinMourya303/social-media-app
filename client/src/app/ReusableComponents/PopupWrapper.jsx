import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddStoryDialogBox, setPostDialogBox, setPreviewPostBox, setSearchDialogBox } from '../stateManagement/slice/popupSlice';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const PopupWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(state => state.userAuth);
  const { searchDialogBox, addStoryDialogBox, postDialogBox, previewPostBox } = useSelector(state => state.popup);

  const isOpen = searchDialogBox || addStoryDialogBox || postDialogBox || previewPostBox;

  const handleOpenChange = (open) => {
    if (!open) {
      if (searchDialogBox) dispatch(setSearchDialogBox(false));
      if (addStoryDialogBox) dispatch(setAddStoryDialogBox(false));
      if (postDialogBox) dispatch(setPostDialogBox(false));
      if (previewPostBox) dispatch(setPreviewPostBox(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`overflow-hidden p-0 h-[70%] 
        ${darkmode ? "bg-darkmode-theme text-white" : "bg-white"} 
        ${previewPostBox ? "md:max-w-[1000px]! md:w-[800px]! xl:max-w-[1500px]! xl:w-[1200px]! h-auto!" : ""}`}>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PopupWrapper;
