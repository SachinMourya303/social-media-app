import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

 export const sendMessageRequest = async ( dispatch, roomId, senderId, receiverId, message , setMessage ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/message/send`, { roomId, senderId, receiverId, message });
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        dispatch(setFollowButtonLoading(false));
        setMessage('');
    }
  }

   export const fetchMessageRequest = async (dispatch , setChat , roomId ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios(`${import.meta.env.VITE_API_URI}/message/chatroom`, {params: { roomId }});
      setChat(response.data);
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        dispatch(setFollowButtonLoading(false));
    }
  }