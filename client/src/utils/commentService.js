import { setFollowButtonLoading } from "@/app/stateManagement/slice/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

 export const sendCommentRequest = async ( dispatch , setComment, postId ,userId , profile, username , comment ) => {
    dispatch(setFollowButtonLoading(true));
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URI}/post/comments`, { postId ,userId , profile, username , comment });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
    finally{
        dispatch(setFollowButtonLoading(false));
        setComment("");
    }
  }