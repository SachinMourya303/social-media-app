import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddStoryDialogBox, setPostDialogBox, setSearchDialogBox } from '../stateManagement/slice/popupSlice';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const PopupWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(state => state.userAuth);
  const { searchDialogBox, addStoryDialogBox , postDialogBox } = useSelector(state => state.popup);

  const isOpen = searchDialogBox || addStoryDialogBox || postDialogBox;

  const handleOpenChange = (open) => {
    if (!open) {
      if (searchDialogBox) dispatch(setSearchDialogBox(false));
      if (addStoryDialogBox) dispatch(setAddStoryDialogBox(false));
      if (postDialogBox) dispatch(setPostDialogBox(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`h-[70%] overflow-hidden p-0 ${darkmode ? "bg-darkmode-theme text-white" : "bg-white"}`}>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PopupWrapper;
