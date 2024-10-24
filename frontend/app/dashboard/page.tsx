/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import {
    LayoutGrid, Users, Calendar, Bell, X, CheckCircle2, Clock, AlertCircle, ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CreateTaskForm from "../../components/CreateTasks";
import TaskFilters from "../../components/TaskFilter";
import CreateTeamForm from "../../components/CreateTeams";
import TaskDetailsModal from "../../components/TaskDetails";
import NotificationsPanel from "../../components/NotificationPanel";
import { Team, Task, Project, User, Notification, Comment } from '../../types/types';

// Define ModalProps type
type ModalProps = {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

// Modal Component
const Modal = ({ show, onClose, title, children }: ModalProps) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-full" title="Close">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    useEffect(() => {
        // Simulate API fetch
        setTeams([
            { id: "team-1", name: "Development Team", memberCount: 8 },
            { id: "team-2", name: "Marketing Team", memberCount: 6 },
        ]);

        setProjects([
            { id: "project-1", name: "Website Redesign", teamId: "team-1", description: "Redesign the company website." },
            { id: "project-2", name: "Ad Campaign", teamId: "team-2", description: "Create a new ad campaign." }
        ]);

        setTasks([
            { id: "task-1", description: "Design homepage", status: "in-progress", dueDate: "2024-10-26", assignee: "John Doe", projectId: "project-1", priority: "medium", comments: [] },
            { id: "task-2", description: "Set up database", status: "completed", dueDate: "2024-10-25", assignee: "Jane Smith", projectId: "project-1", priority: "high", comments: [] },
            { id: "task-3", description: "User authentication", status: "overdue", dueDate: "2024-10-21", assignee: "Mike Johnson", projectId: "project-2", priority: "low", comments: [] },
        ]);

        setUsers([
            { id: "user-1", name: "John Doe", email: "john@example.com" },
            { id: "user-2", name: "Jane Smith", email: "jane@example.com" },
            { id: "user-3", name: "Mike Johnson", email: "mike@example.com" }
        ]);

        setNotifications([
            { id: "notif-1", type: "deadline", message: "Task 'Set up database' is due soon!", timestamp: "2024-10-24T08:30:00Z" },
            { id: "notif-2", type: "mention", message: "John Doe mentioned you in a comment", timestamp: "2024-10-23T12:45:00Z" }
        ]);

        setFilteredTasks([
            { id: "task-1", description: "Design homepage", status: "in-progress", dueDate: "2024-10-26", assignee: "John Doe", projectId: "project-1", priority: "medium", comments: [] },
            { id: "task-2", description: "Set up database", status: "completed", dueDate: "2024-10-25", assignee: "Jane Smith", projectId: "project-1", priority: "high", comments: [] },
            { id: "task-3", description: "User authentication", status: "overdue", dueDate: "2024-10-21", assignee: "Mike Johnson", projectId: "project-2", priority: "low", comments: [] },
        ]);
    }, []);

    const handleTaskClick = (taskId: string) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) setSelectedTask(task);
    };

    const handleTeamClick = (teamId: string) => {
        const team = teams.find((t) => t.id === teamId);
        if (team) setSelectedTeam(team);
    };

    const handleFilterChange = (filterType: string, value: string) => {
        let updatedTasks = tasks;
        if (filterType === 'project') updatedTasks = tasks.filter(task => task.projectId === value || value === '');
        if (filterType === 'assignee') updatedTasks = tasks.filter(task => task.assignee === value || value === '');
        if (filterType === 'status') updatedTasks = tasks.filter(task => task.status === value || value === '');
        setFilteredTasks(updatedTasks);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative hover:bg-gray-100 p-2 rounded-full">
                    <Bell className="h-6 w-6 text-gray-500" />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Task Filters */}
            <TaskFilters projects={projects} members={users} onFilterChange={handleFilterChange} />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Active Teams", value: teams.length.toString(), icon: LayoutGrid },
                    { title: "Team Members", value: teams.reduce((acc, team) => acc + team.memberCount, 0).toString(), icon: Users },
                    { title: "Active Tasks", value: tasks.length.toString(), icon: Calendar },
                    { title: "Notifications", value: notifications.length.toString(), icon: Bell }
                ].map(stat => (
                    <Card key={stat.title}>
                        <CardContent className="p-4 flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <stat.icon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Teams Section */}
            <Card>
                <CardHeader className="border-b border-gray-200">
                    <CardTitle>Your Teams</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() => handleTeamClick(team.id)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{team.name}</h3>
                                    <span className="flex items-center text-sm text-gray-500">
                                        <Users className="h-4 w-4 mr-1" />
                                        {team.memberCount} members
                                    </span>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Task Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTasks.map(task => (
                    <div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                        <h3 className="font-semibold">{task.description}</h3>
                        <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
                    </div>
                ))}
            </div>

            {/* Notifications Panel */}
            <NotificationsPanel notifications={notifications} onDismiss={(id) => setNotifications(notifications.filter(notif => notif.id !== id))} />

            {/* Task Details Modal */}
            {selectedTask && (
                <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdateStatus={function (taskId: string, status: Task["status"]): void {
                    throw new Error("Function not implemented.");
                } } onAddComment={function (taskId: string, content: string): void {
                    throw new Error("Function not implemented.");
                } } />
            )}

            {/* Create Task and Team Forms */}
            <CreateTaskForm projects={projects} members={users} onSubmit={() => {}} onCancel={() => {}} />
            <CreateTeamForm onSubmit={() => {}} onCancel={() => {}} />
        </div>
    );
}
