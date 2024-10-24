import { Project, User } from "../types/types";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const TaskFilters = ({ 
    projects, 
    members, 
    onFilterChange 
}: { 
    projects: Project[], 
    members: User[], 
    onFilterChange: (filterType: string, value: string) => void 
}) => {
    return (
        <div className="flex gap-4 mb-6">
            {/* Filter by Project */}
            <Select value="ProjectFiltering" onValueChange={(value) => onFilterChange('project', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Project" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-projects">All Projects</SelectItem>
                    {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                            {project.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Filter by Assignee */}
            <Select value="AssigneeFiltering" onValueChange={(value) => onFilterChange('assignee', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Assignee" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-members">All Members</SelectItem>
                    {members.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                            {member.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Filter by Status */}
            <Select value="StatusFiltering" onValueChange={(value) => onFilterChange('status', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default TaskFilters;
