"use client"
import React, { useState } from 'react';
import { User, Mail, Lock, UserCog } from 'lucide-react';
import Image from 'next/image';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_DB}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log(data);
            window.location.href = '/login';
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Registration Form */}
            <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-500">Please fill in your details to register</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black"
                                            placeholder="Create a password"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="role">
                                        Account Type
                                    </label>
                                    <div className="relative">
                                        <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <select
                                            id="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 appearance-none text-black"
                                            required
                                        >
                                            <option className="text-red-500" value="admin">Admin</option>
                                            <option className="text-green-500" value="user">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Create Account
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Image and overlay text */}
            <div className="w-1/2 bg-blue-350 relative overflow-hidden">
                <Image 
                    src="https://github.com/Me-lind/Fullstack-XATA/blob/frontend/frontend/public/assets/desola-lanre-ologun-IgUR1iX0mqM-unsplash.jpg?raw=true" 
                    alt="Register" 
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 opacity-60 blur-sm"
                />
                <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-white">
                    <div className="bg-blue-600 p-5 rounded-md">
                        <h3 className="text-5xl font-bold mb-4">Join Our Community</h3>
                        <p className="text-2xl text-center text-blue-100 max-w-md">
                            Start your journey with us and discover a world of possibilities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}