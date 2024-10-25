/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useRef } from "react";
import {
    LayoutGrid, Users, Calendar, Bell, X, ChevronRight, PlusCircle,
    Loader2, AlertCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import CreateTaskForm from "../../components/CreateTasks";
import TaskFilters from "../../components/TaskFilter";
import CreateTeamForm from "../../components/CreateTeams";
import TaskDetailsModal from "../../components/TaskDetails";
import TeamView from "../../components/TeamView";
import NotificationsPanel from "../../components/NotificationPanel";
import { Team, Task, Project, User, Notification } from '../../types/types';

// Enhanced Modal Component with animation
const Modal = ({ show, onClose, title, children }: {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform animate-slideIn">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-indigo-100 p-2 rounded-full transition-colors duration-200"
                        title="Close"
                    >
                        <X className="h-5 w-5 text-indigo-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
    </div>
);

// Notifications Dialog Component
const NotificationsDialog = ({
    open,
    onOpenChange,
    notifications,
    onDismiss
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    notifications: Notification[];
    onDismiss: (id: string) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-indigo-700">
                        Notifications
                    </DialogTitle>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No notifications</p>
                    ) : (
                        <ul className="space-y-3">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors"
                                >
                                    <div className="flex-1 mr-4">
                                        <p className="text-sm text-gray-800">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : 'Invalid date'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onDismiss(notification.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Dismiss"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
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
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const teamViewRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const scrollToTeamSection = (teamId: string) => {
        const element = teamViewRefs.current[teamId];
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };


    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setTeams([
                { id: "team-1", name: "Development Team", memberCount: 8 },
                { id: "team-2", name: "Marketing Team", memberCount: 6 },
            ]);

            setProjects([
                { id: "project-1", name: "Website Redesign", teamId: "team-1", description: "Redesign the company website." },
                { id: "project-2", name: "Ad Campaign", teamId: "team-2", description: "Create a new ad campaign." }
            ]);

            setTasks([
                { id: "task-1", name: "Web Dev", description: "Design homepage", status: "in-progress", duedate: "2024-10-26", assignedToId: "John Doe", projectId: "project-1", priority: "medium", comments: [] },
                { id: "task-2", name: "Cloud", description: "Set up database", status: "completed", duedate: "2024-10-25", assignedToId: "Jane Smith", projectId: "project-1", priority: "high", comments: [] },
                { id: "task-3", name: "Mobile Dev", description: "User authentication", status: "pending", duedate: "2024-10-21", assignedToId: "Mike Johnson", projectId: "project-2", priority: "low", comments: [] },
            ]);

            setUsers([
                { id: "user-1", name: "John Doe", email: "john@example.com" },
                { id: "user-2", name: "Jane Smith", email: "jane@example.com" },
                { id: "user-3", name: "Mike Johnson", email: "mike@example.com" }
            ]);

            setNotifications([
                { id: "notif-1", type: "deadline", message: "Task 'Set up database' is due soon!", timestamp: "2024-10-24T08:30:00Z" },
                { id: "notif-2", type: "mention", message: "John Doe mentioned you in a comment", timestamp: "2024-10-23T12:45:00Z" },
                { id: "notif-3", type: "update", message: "You have been assigned a new task", timestamp: "2024-10-23T12:45:00Z" },
            ]);

            setFilteredTasks([
                { id: "task-1", name: "Web Dev", description: "Design homepage", status: "in-progress", duedate: "2024-10-26", assignedToId: "John Doe", projectId: "project-1", priority: "medium", comments: [] },
                { id: "task-2", name: "Cloud", description: "Set up database", status: "completed", duedate: "2024-10-25", assignedToId: "Jane Smith", projectId: "project-1", priority: "high", comments: [] },
                { id: "task-3", name: "Mobile Dev", description: "User authentication", status: "pending", duedate: "2024-10-21", assignedToId: "Mike Johnson", projectId: "project-2", priority: "low", comments: [] },
            ]);

            setIsLoading(false);
        }, 1000);
    }, []);

    const handleFilterChange = (filterType: string, value: string) => {
        let updatedTasks = tasks;
        if (filterType === 'project') updatedTasks = tasks.filter(task => task.projectId === value || value === '');
        if (filterType === 'assignee') updatedTasks = tasks.filter(task => task.assignedToId === value || value === '');
        if (filterType === 'status') updatedTasks = tasks.filter(task => task.status === value || value === '');
        setFilteredTasks(updatedTasks);
    };

    const handleAddMember = (id: string) => {
        console.log("Adding member to team:", id);
        // Implement member addition logic
    };

    const handleAddProject = (id: string) => {
        console.log("Adding project to team:", id);
        // Implement project addition logic
    };

    const handleUpdateStatus = (taskId: string, status: Task["status"]) => {
        console.log("Updating task status:", taskId, status);
        // Implement status update logic
    };

    const handleAddComment = (taskId: string, content: string) => {
        console.log("Adding comment to task:", taskId, content);
        // Implement comment addition logic
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
                <LoadingSpinner />
            </div>
        );
    }

    const handleTeamSelect = (team: Team) => {
        setSelectedTeam(team);
        // Add a small delay to ensure the TeamView component is rendered
        setTimeout(() => {
            scrollToTeamSection(team.id);
        }, 100);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-indigo-50 to-white">
            {/* Enhanced Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative hover:bg-indigo-100 p-2 rounded-full transition-colors duration-200"
                >
                    <Bell className="h-6 w-6 text-indigo-500" />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Task Filters */}
            <TaskFilters projects={projects} members={users} onFilterChange={handleFilterChange} />

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Active Teams", value: teams.length.toString(), icon: LayoutGrid, color: "from-blue-500 to-indigo-500" },
                    { title: "Team Members", value: teams.reduce((acc, team) => acc + team.memberCount, 0).toString(), icon: Users, color: "from-indigo-500 to-purple-500" },
                    { title: "Active Tasks", value: tasks.length.toString(), icon: Calendar, color: "from-purple-500 to-pink-500" },
                    { title: "Notifications", value: notifications.length.toString(), icon: Bell, color: "from-pink-500 to-rose-500" }
                ].map(stat => (
                    <Card key={stat.title} className="transform hover:scale-105 transition-transform duration-200">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Enhanced Teams Overview */}
            <Card className="rounded-xl shadow-lg border-none">
                <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Your Teams</CardTitle>
                        <Button
                            onClick={() => setShowCreateTeamModal(true)}
                            className="bg-white text-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create Team
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-200 cursor-pointer"
                                onClick={() => handleTeamSelect(team)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">
                                        {team.name}
                                    </h3>
                                    <span className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        <Users className="h-4 w-4 mr-1 text-indigo-500" />
                                        {team.memberCount} members
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>View details</span>
                                    <ChevronRight className="h-5 w-5 text-indigo-500 transform group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Enhanced Notifications Panel */}
            {showNotifications && (
                <div className="fixed top-16 right-4 w-96 transform animate-slideIn">
                    <NotificationsPanel
                        notifications={notifications}
                        onDismiss={(id) => {
                            setNotifications(notifications.filter(notif => notif.id !== id));
                        }}
                    />
                </div>
            )}

            {/* Selected Team View */}
            {selectedTeam && (
                <div
                    ref={el => {
                        teamViewRefs.current[selectedTeam.id] = el;
                    }}
                    className="animate-fadeIn scroll-mt-6"
                >
                    <TeamView
                        team={selectedTeam}
                        onAddMember={() => handleAddMember(selectedTeam.id)}
                        onAddProject={() => handleAddProject(selectedTeam.id)}
                        projects={projects}
                        tasks={tasks}
                        users={users}
                    />
                </div>
            )}

            {/* Modals */}
            <Modal show={showCreateTeamModal} onClose={() => setShowCreateTeamModal(false)} title="Create New Team">
                <CreateTeamForm
                    onSubmit={() => setShowCreateTeamModal(false)}
                    onCancel={() => setShowCreateTeamModal(false)}
                />
            </Modal>

            {/* Task Details Modal */}
            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onUpdateStatus={handleUpdateStatus}
                    onAddComment={handleAddComment}
                />
            )}
        </div>
    );
}