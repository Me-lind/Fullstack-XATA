import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Task } from "../types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


const TaskDetailsModal = ({ 
    task, 
    onUpdateStatus, 
    onAddComment 
}: { 
    task: Task, 
    onClose: () => void, 
    onUpdateStatus: (taskId: string, status: Task['status']) => void,
    onAddComment: (taskId: string, content: string) => void 
}) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(task.id, newComment);
            setNewComment('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{task.description}</h3>
                    <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
                </div>
                <Badge className={task.priority === 'high' ? 'badge-destructive' : 'badge-default'}>
                    {task.priority} priority
                </Badge>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Status</p>
                <Select 
                    defaultValue={task.status} 
                    onValueChange={(value: Task['status']) => onUpdateStatus(task.id, value)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <h4 className="font-medium mb-2">Comments</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                    {task.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium">{comment.userName}</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(comment.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="mt-4">
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="mb-2"
                    />
                    <Button type="submit" disabled={!newComment.trim()}>
                        Add Comment
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetailsModal;