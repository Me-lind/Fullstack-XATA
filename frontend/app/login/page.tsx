"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center">
            {/* Background Images */}
            <div className="absolute inset-0 grid grid-cols-2 overflow-hidden">
                {/* Left Background Image */}
                <div className="relative">
                    <Image 
                        src="https://github.com/Me-lind/Fullstack-XATA/blob/frontend/frontend/public/assets/business-people-working-laptop.jpg" 
                        alt="Left background" 
                        fill 
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                
                {/* Right Background Image */}
                <div className="relative">
                    <Image 
                        src="https://github.com/Me-lind/Fullstack-XATA/blob/frontend/frontend/public/assets/diverse-businesspeople-having-meeting.jpg" 
                        alt="Right background" 
                        fill 
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Additional overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-20"></div>

            {/* Login Container */}
            <div className="w-full max-w-md relative z-30 px-4">
                <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-2xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-600">Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

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
                                        className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
