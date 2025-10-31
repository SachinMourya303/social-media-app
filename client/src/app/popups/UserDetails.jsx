import React, { useEffect, useState } from 'react'
import { ChevronLeft, User } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setUserDetails } from '../stateManagement/slice/authSlice'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Spinner } from '@/components/ui/spinner'
import { websiteLogo } from '@/assets/assets'

const UserDetails = () => {
    const userToken = useSelector((state) => state.userAuth.userToken);

    const [isPending, setIspending] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const closeBtn = () => {
        dispatch(logOut());
        navigate('/login');
    }

    const [userProfile, setUserProfile] = useState(null);
    const [userData, setUserData] = useState({
        userName: "",
        bio: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIspending(true);
        try {
            const formData = new FormData();
            formData.append('profile', userProfile);
            formData.append('username', userData.userName);
            formData.append('email', userToken.users.email);
            formData.append('bio', userData.bio);
            formData.append('password', userToken.users.password);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URI}/users/user-data`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            await fetchUserDetails();
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error.message);
        } finally {
            setIspending(false);
        }
    };


    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/user-details?email=${userToken.users.email}`);
            dispatch(setUserDetails(response.data))
        } catch (error) {
            console.error("Error :", error);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>

            <div className='w-[50%] h-[100%] hidden md:flex items-center justify-between p-5'>
                <img src={websiteLogo.background4} alt="" className='bg-[#92E3A9]/40 h-full rounded-lg' />
            </div>

            <div className="flex justify-center items-center w-full md:w-[50%]">
                <div className='w-[80%] text-center rounded-2xl md:px-10 bg-white'>
                    <button onClick={closeBtn} className='flex items-center w-10 h-10 bg-transparent hover:bg-gray-300 cursor-pointer rounded-full'>
                        <ChevronLeft className='size-8 text-gray-500' />
                    </button>
                    <div className="pb-4 flex justify-center">
                        <Input type="file" id="user-profile" hidden onChange={(e) => setUserProfile(e.target.files[0] || null)} />
                        <Label htmlFor="user-profile" className="flex justify-center items-center cursor-pointer h-[100px] w-[100px]">
                            <figure className='border-2 border-gray-300 rounded-full w-full h-full'>
                                <img src={userProfile 
                                    ? URL.createObjectURL(userProfile) 
                                    : websiteLogo.dummyUserIcon} alt="user-profile" className="h-full w-full rounded-full object-cover" />

                                <figcaption className='text-gray-500 mt-3'>Add Photo</figcaption>
                            </figure>
                        </Label>
                    </div>
                    <form onSubmit={onSubmit} className='mt-15'>
                        <div className="flex items-center w-full my-4 bg-white/80 border border-gray-300 h-12 rounded-full overflow-hidden px-4 gap-2">
                            <User className='text-gray-500 size-5' />
                            <Input onChange={handleChange} type="name" name='userName' placeholder="Username" value={userData.userName} className="border-none outline-none ring-0! bg-transparent rounded-full" required />
                        </div>
                        <div className="mb-5">
                            <textarea rows={6} onChange={handleChange} type="text" name='bio' placeholder="Enter bio" value={userData.bio} className="w-full my-4 bg-white/80 border border-gray-300 rounded-xl overflow-hidden px-4 py-2" />
                        </div>

                        <button
                            type='submit'
                            className="py-2.5 font-medium w-full rounded-full text-white transition-colors duration-300 bg-black mt-5 cursor-pointer hover:bg-black/80"
                        >
                            {isPending ? (
                                <div className='flex gap-2 items-center justify-center'>
                                    <Spinner />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>


                    </form>
                    <p className="mt-8 text-center text-sm text-gray-400">
                        By clicking on sign in, you agree to our
                        <a href="/user-details" className="underline">Terms of Service</a> and <a href="/user-details" className="underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserDetails