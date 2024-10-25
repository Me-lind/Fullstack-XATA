import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Project, User, Task } from "../types/types"

interface TaskCardProps {
    projects: Project[];
    task: Task;
    users: User[];
}

const TaskCard = ({ task, users }: TaskCardProps) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const assignedUser = users.find(user => user.id === task.assignedToId);

    const statusColors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800'
    };

    return (
        <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-medium">{task.name}</h4>
                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <Badge className={statusColors[task.status]}>
                    {task.status}
                </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback>{assignedUser?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>{assignedUser?.name}</span>
                </div>
                <span className="text-gray-500">Due: {new Date(task.duedate).toLocaleDateString()}</span>
            </div>

            <div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2"
                >
                    <MessageSquare className="h-4 w-4" />
                    {(task.comments?.length ?? 0)} Comments
                </Button>

                {showComments && (
                    <div className="mt-3 space-y-3">
                        {(task.comments ?? []).map((comment, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                            />
                            <Button
                                size="sm"
                                onClick={() => {
                                    if (newComment.trim()) {
                                        (task.comments ??= []).push({ content: newComment, createdAt: new Date().toISOString() });
                                        setNewComment('');
                                    }
                                }}
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;