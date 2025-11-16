import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";

 export const sendMessageRequest = async ( dispatch, roomId, senderId, receiverId, message , setMessage ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/message/send`, { roomId, senderId, receiverId, message });
      toast.success(response.data.message);
    } catch (error) {
    }
    finally{
        dispatch(setFollowButtonLoading(false));
        setMessage('');
    }
  }