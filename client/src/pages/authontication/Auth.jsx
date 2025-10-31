import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { websiteLogo } from '../../assets/assets'
import { Lock, Mail, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, setUserDetails } from '@/app/stateManagement/slice/authSlice';
import { Spinner } from '@/components/ui/spinner';

const Auth = () => {
    const userToken = useSelector(state => state.userAuth.userToken);
    const dispatch = useDispatch();
    const [state, setState] = useState("login");
    const [isPending, setIspending] = useState(false);
    const [authData, setAuthData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIspending(true);
        try {
            const endpoint = state === "login" ? "signin" : "signup";
            const payload = state === "login" ? { email: authData.email, password: authData.password } : authData;
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/auth/${endpoint}`, payload);
            await fetchAuthDetails();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log('Error:', error);
        }
        finally {
            setIspending(false);
        }
    };

    const fetchAuthDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/auth/allusers?email=${authData.email}`);
            dispatch(logIn(response.data));
            await fetchUserDetails(authData.email);
        } catch (error) {
            console.error("Error :", error);
        }
    }

    const fetchUserDetails = async (email) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/user-details?email=${email}`);

            if (response.data?.users) {
                dispatch(setUserDetails(response.data));
            } else {
                dispatch(setUserDetails(""));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setAuthData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <div className='flex h-screen w-full justify-center'>

                <div className='w-[50%] h-[100%] hidden md:flex items-center justify-center p-5'>
                    <img src={websiteLogo.background} alt="" className='bg-[#92E3A9]/40 h-full rounded-lg' />
                </div>

                <div className="flex justify-center items-center p-5 md:p-0 w-full md:w-[50%]">
                    <form onSubmit={handleSubmit} className="w-[80%] text-center rounded-2xl md:px-10 bg-white">
                        <h1 className="text-gray-900 text-4xl md:text-5xl mt-10 font-medium">{state === "login" ? "Welcome Back!" : "Welcome to TwitBook!"}</h1>
                        <p className="text-gray-500 text-sm w-full flex justify-center my-8">
                            <span className='w-full md:w-[70%]'>
                                Post it fast, make it trend, Chat, connect, and make a friend. Tweets and posts, all in one nook, Live your vibe loud — on <strong>TwitBook!</strong>
                            </span>
                        </p>
                        {state !== "login" && (
                            <div className="flex items-center mt-6 w-full bg-white/80 border border-gray-300 h-12 rounded-full overflow-hidden px-4 gap-2">
                                <User className='text-gray-500 size-5' />
                                <Input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0! bg-transparent rounded-full" value={authData.name} onChange={handleChange} disabled={state === "login"} required={state !== "login"} />
                            </div>
                        )}
                        <div className="flex items-center w-full mt-4 bg-white/80 border border-gray-300 h-12 rounded-full overflow-hidden px-4 gap-2">
                            <Mail className='text-gray-500 size-5' />
                            <Input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0! bg-transparent rounded-full" value={authData.email} onChange={handleChange} required />
                        </div>
                        <div className="flex items-center mt-4 w-full bg-white/80 border border-gray-300 h-12 rounded-full overflow-hidden px-4 gap-2">
                            <Lock className='text-gray-500 size-5' />
                            <Input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0! bg-transparent rounded-full" value={authData.password} onChange={handleChange} required />
                        </div>
                        <Button type="submit" className="mt-15 w-full h-11 rounded-full text-white bg-black hover:bg-black/80 transition-opacity cursor-pointer">
                            {isPending ? (
                                <div className='flex gap-2 items-center justify-center'>
                                    <Spinner />
                                </div>
                            ) : (
                                <div>
                                    {state === "login" ? "Login" : "Sign up"}
                                </div>
                            )}
                        </Button>
                        <p className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"}<Button type='button' onClick={() => setState(prev => prev === "login" ? "register" : "login")} className='text-primary bg-transparent hover:bg-transparent cursor-pointer'>click here</Button></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth