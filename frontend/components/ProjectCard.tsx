import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { Project, User, Task } from "../types/types";
import { PlusCircle, X } from "lucide-react";
import CreateTaskForm from "./CreateTasks";

const ActionButton = ({ onCreateTask }: { onCreateTask: () => void }) => (
    <div className="flex gap-4 mb-6">
        <Button
            onClick={onCreateTask}
            className="flex items-center gap-2"
        >
            <PlusCircle className="h-4 w-4" />
            Create Task
        </Button>
    </div>
);

type ModalProps = {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

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

interface ProjectCardProps {
    project: Project;
    tasks: Task[];
    users: User[];
}

const ProjectCard = ({ project, tasks, users }: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    return (
        <Card>
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{tasks.length} tasks</p>
                    </div>
                    <ActionButton onCreateTask={() => setShowCreateTaskModal(true)} />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Hide Tasks' : 'Show Tasks'}
                    </Button>
                </div>
            </CardHeader>
            {isExpanded && (
                <CardContent className="p-4">
                    <div className="space-y-4">
                        {tasks.map((task: Task) => (
                            <TaskCard key={task.id} task={task} users={users} projects={[]} />
                        ))}
                    </div>
                </CardContent>
            )}

            <Modal show={showCreateTaskModal} onClose={() => setShowCreateTaskModal(false)} title="Create New Task">
                <CreateTaskForm
                    projects={[project]}
                    members={users}
                    onSubmit={() => setShowCreateTaskModal(false)}
                    onCancel={() => setShowCreateTaskModal(false)}
                />
            </Modal>
        </Card>
    );
};

export default ProjectCard;
