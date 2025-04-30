import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';


export const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=(?:.*[A-Z]){3})(?=(?:.*[a-z]){3})(?=(?:.*\d){1})(?=(?:.*[!@#$%^&*]){1}).*$/;

const registerPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submitHandler(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!emailValid || !passwordValid) {
            setError("Please correct the errors before submitting.");
            return;
        }
        setLoading(true);
        setError(null);


        try {
            const response = axios.post('http://localhost:7821/auth/register', {
                email,
                password,
                firstName,
                lastName
            });
            setLoading(false);
            console.log(response, `try response in front`);
            navigate({ to: '/' });
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data || "Signup failed");
            console.log(err, 'err in catch front');

        }
        console.log(email, password, firstName, lastName);
    }

    function loginHandler() {
        navigate({ to: '/login' });
    }


    function validateEmail(email: string) {
        setEmail(email);
        setEmailValid(EMAIL_REGEX.test(email));
    }

    const validatePassword = (password: string) => {
        setPassword(password);
        setPasswordValid(PASSWORD_REGEX.test(password));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <form action="" className="flex flex-col space-y-6 w-[20em]">
                    <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Register</h1>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                            First name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                            Last name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${emailValid ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none focus:ring-[#556b82] focus:border-[#556b82] sm:text-sm`}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${emailValid ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none focus:ring-[#556b82] focus:border-[#556b82] sm:text-sm`}
                            required
                        />
                    </div>

                    <div className='mt-4'>
                        <button
                            type="submit"
                            className="w-full p-2 bg-[#838282] text-white rounded-md hover:bg-[#a1a1a1] focus:outline-none focus:ring-2 focus:ring-[#556b82]"
                            onClick={submitHandler}>
                            Register
                        </button>
                    </div>

                    <div>Have an account? <button className='text-blue-200' onClick={loginHandler}>Login</button></div>
                </form>
            </div>
        </div>
    )
}

export default registerPage
