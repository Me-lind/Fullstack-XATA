"use client"
import React from 'react';
import { ArrowRight, CheckCircle, Users, Calendar, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const features = [
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "Team Collaboration",
            description: "Create and join teams, work together seamlessly"
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
            title: "Task Management",
            description: "Create, assign, and track tasks with ease"
        },
        {
            icon: <Calendar className="w-6 h-6 text-blue-500" />,
            title: "Project Timeline",
            description: "Set due dates and monitor project progress"
        },
        {
            icon: <Bell className="w-6 h-6 text-blue-500" />,
            title: "Notifications",
            description: "Stay updated with real-time alerts and reminders"
        }
    ];

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 w-full object-cover"
                style={{
                    backgroundImage: 'url("https://github.com/Me-lind/Fullstack-XATA/blob/frontend/frontend/public/assets/colleagues-giving-fist-bump.jpg?raw=true")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'fixed',
                    opacity: 0.28
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="container mx-auto px-4 pt-20 pb-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Streamline Your Team&apos;s Workflow
                        </h1>
                        <p className="text-xl text-white-600 mb-8">
                            A powerful task management platform designed to help teams collaborate,
                            track progress, and achieve goals together.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => navigate('/register')} className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="bg-transparent py-16 rounded-l">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Everything You Need to Manage Tasks
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <div className="mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-blue-500">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Transform Your Team&apos;s Productivity?
                        </h2>
                        <p className="text-lg mb-8 text-blue-100">
                            Join thousands of teams already using our platform to achieve more.
                        </p>
                        <button onClick={() => navigate('/register')} className="px-6 py-3 text-lg font-medium bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}