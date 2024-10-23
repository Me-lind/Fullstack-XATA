"use client"
import { useEffect, useState } from "react";
import {
    LayoutGrid,
    Users,
    Calendar,
    Bell,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

interface Team {
    id: string;
    name: string;
    memberCount: number;
}

interface Task {
    id: string;
    description: string;
    status: 'completed' | 'in-progress' | 'overdue';
    dueDate: string;
    assignee: string;
}

export default function Dashboard() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Simulate fetching teams and tasks from an API
    useEffect(() => {
        setTeams([
            { id: "team-1", name: "Development Team", memberCount: 8 },
            { id: "team-2", name: "Marketing Team", memberCount: 6 },
        ]);

        setTasks([
            {
                id: "task-1",
                description: "Design homepage",
                status: 'in-progress',
                dueDate: '2024-10-26',
                assignee: 'John Doe'
            },
            {
                id: "task-2",
                description: "Set up database",
                status: 'completed',
                dueDate: '2024-10-25',
                assignee: 'Jane Smith'
            },
            {
                id: "task-3",
                description: "User authentication",
                status: 'overdue',
                dueDate: '2024-10-21',
                assignee: 'Mike Johnson'
            },
        ]);
    }, []);
  
    const stats = [
        { title: 'Active Teams', value: teams.length.toString(), icon: LayoutGrid },
        { title: 'Team Members', value: teams.reduce((acc, team) => acc + team.memberCount, 0).toString(), icon: Users },
        { title: 'Active Tasks', value: tasks.length.toString(), icon: Calendar },
        { title: 'Notifications', value: '3', icon: Bell },
    ];

    const getStatusIcon = (status: Task['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'in-progress':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'overdue':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
        }
    };

    const getStatusBadge = (status: Task['status']) => {
        const baseClasses = "px-2 py-1 rounded-full text-sm";
        switch (status) {
            case 'completed':
                return <span className={`${baseClasses} bg-green-100 text-green-700`}>Completed</span>;
            case 'in-progress':
                return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>In Progress</span>;
            case 'overdue':
                return <span className={`${baseClasses} bg-red-100 text-red-700`}>Overdue</span>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Bell className="h-6 w-6 text-gray-500" />
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        JD
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Icon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Teams Section */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Your Teams</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{team.name}</h3>
                                    <span className="flex items-center text-sm text-gray-500">
                                        <Users className="h-4 w-4 mr-1" />
                                        {team.memberCount} members
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex -space-x-2">
                                        {[...Array(Math.min(team.memberCount, 4))].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white"
                                            />
                                        ))}
                                        {team.memberCount > 4 && (
                                            <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                                                +{team.memberCount - 4}
                                            </div>
                                        )}
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tasks Kanban Board */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Task Board</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['in-progress', 'completed', 'overdue'] as Task['status'][]).map((status) => (
                            <div key={status} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold capitalize">{status.replace('-', ' ')}</h3>
                                    <span className="text-sm text-gray-500">
                                        {tasks.filter(task => task.status === status).length} tasks
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {tasks
                                        .filter(task => task.status === status)
                                        .map((task) => (
                                            <div
                                                key={task.id}
                                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        {getStatusIcon(task.status)}
                                                        <h4 className="font-medium">{task.description}</h4>
                                                    </div>
                                                    {getStatusBadge(task.status)}
                                                </div>
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <span>Assigned to {task.assignee}</span>
                                                    <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}