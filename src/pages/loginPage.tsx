import React, { useState } from 'react'
import {
    ErrorComponent,
    RouterProvider,
    createRouter,
    useNavigate,
} from '@tanstack/react-router'
import axios from 'axios';
import { useJwtToken } from '../hooks/useJwtToken';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
    const { saveData } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submitHandler(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post('http://localhost:7821/auth/login', { email, password });
            console.log(`res.data`, res.data);

            const data = res.data
            console.log(`Before saveData data =`, data);

            if (data.token && data.user) {
                saveData({
                    token: data.token,
                    user: data.user
                });
                navigate({ to: '/' });
            } else {
                setError("Password or email is incorrect.");
            }
            console.log(`After saveData data = ${data}`);

        } catch (error) {
            console.error(error);
            setError("Password or email is incorrect.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate({ to: '/register' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <button
                    onClick={submitHandler}
                    className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <button
                        type="button"
                        className="text-green-500 hover:underline focus:outline-none"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
