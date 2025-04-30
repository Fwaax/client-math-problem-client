import React from 'react'
import {
    ErrorComponent,
    RouterProvider,
    createRouter,
    useNavigate,
} from '@tanstack/react-router'
import { useJwtToken } from '../hooks/useJwtToken';
import { useAuth } from '../context/authContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, token, clearData } = useAuth(); // 🔥 Shared global

    function loginNavHandler() {
        navigate({ to: '/login' });
    }

    function logoutHandler() {
        clearData();
        navigate({ to: '/' }); // optional: send back to home after logout
    }

    function registerHandler() {
        navigate({ to: '/register' });
    }

    const tokenExists = !!token;

    return (
        <div className='h-[60px] bg-gray-700 flex flex-row justify-center items-center'>
            <div className='w-[70%] flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-7 font-bold'>
                    <div className='cursor-pointer'>Home</div>
                    <div className='cursor-pointer'>My uploads</div>
                    <div className='cursor-pointer'>Tags</div>
                </div>
                <div className='font-bold'>
                    {tokenExists ? (
                        <div className='cursor-pointer flex flex-row items-center gap-5'>
                            <div>{user?.firstName ?? "Me"}</div>
                            <div><img className='w-[50px] h-[50px] rounded' src="./assets/react.svg" alt="" /></div>
                            <div className='text-red-500 cursor-pointer' onClick={logoutHandler}>Logout</div>
                        </div>
                    ) : (
                        <div className='flex gap-7'>
                            <div onClick={registerHandler} className='cursor-pointer'>Register</div>
                            <div onClick={loginNavHandler} className='cursor-pointer'>Login</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;