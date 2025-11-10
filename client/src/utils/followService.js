import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

 export const sendFollowRequest = async ( dispatch , senderId, receiverId ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/following`, { senderId, receiverId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
    finally{
        dispatch(setFollowButtonLoading(false));
    }
  }