import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

 export const sendDeletePostRequest = async ( dispatch, postId ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URI}/post/delete`, { postId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
    finally{
        dispatch(setFollowButtonLoading(false));
    }
  }