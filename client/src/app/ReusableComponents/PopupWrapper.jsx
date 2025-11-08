import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddStoryDialogBox, setSearchDialogBox } from '../stateManagement/slice/popupSlice';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const PopupWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(state => state.userAuth);
  const { searchDialogBox, addStoryDialogBox } = useSelector(state => state.popup);

  const isOpen = searchDialogBox || addStoryDialogBox;

  const handleOpenChange = (open) => {
    if (!open) {
      if (searchDialogBox) dispatch(setSearchDialogBox(false));
      if (addStoryDialogBox) dispatch(setAddStoryDialogBox(false));
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
