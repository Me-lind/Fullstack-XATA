import { useState } from "react";
import { Project, User, Task } from "../types/types";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CreateTaskForm = ({ 
    projects, 
    members, 
    onSubmit, 
    onCancel 
}: { 
    projects: Project[], 
    members: User[], 
    onSubmit: (data: Partial<Task>) => void, 
    onCancel: () => void 
}) => {
    const [formData, setFormData] = useState({
        description: '',
        projectId: '',
        assignee: '',
        dueDate: '',
        priority: 'medium' as Task['priority']
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Project</label>
                <Select onValueChange={(value) => setFormData({ ...formData, projectId: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                        {projects.map(project => (
                            <SelectItem key={project.id} value={project.id}>
                                {project.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <Select onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                        {members.map(member => (
                            <SelectItem key={member.id} value={member.name}>
                                {member.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select onValueChange={(value: Task['priority']) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Create Task</Button>
            </div>
        </form>
    );
};

export default CreateTaskForm;