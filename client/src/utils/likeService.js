import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

 export const sendLikesRequest = async ( dispatch , postId ,userId , profile, username ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URI}/post/likes`, { postId ,userId , profile, username });
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
    finally{
        dispatch(setFollowButtonLoading(false));
    }
  }