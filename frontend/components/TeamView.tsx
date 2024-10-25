import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { UserPlus, FolderPlus } from "lucide-react";
import { useState } from "react";
import { Project, User, Task, Team } from "../types/types"
import ProjectCard from "./ProjectCard";

interface TeamViewProps {
    projects: Project[];
    tasks: Task[];
    users: User[];
    team: Team,
    onAddMember: () => void;
    onAddProject: () => void;
}

const TeamView = ({ team, onAddMember, onAddProject, projects, tasks, users }: TeamViewProps) => {
    const [showMembers, setShowMembers] = useState(false);

    return (
        <Card className="mt-4">
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            {team.memberCount} team members
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onAddMember} className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Add Member
                        </Button>
                        <Button onClick={onAddProject} className="flex items-center gap-2">
                            <FolderPlus className="h-4 w-4" />
                            Add Project
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Team Members</h3>
                        <Button
                            variant="ghost"
                            onClick={() => setShowMembers(!showMembers)}
                            className="text-sm"
                        >
                            {showMembers ? 'Hide' : 'Show'} Members
                        </Button>
                    </div>
                    {showMembers && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {users.map(user => (
                                <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Avatar>
                                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects
                            .filter(project => project.teamId === team.id)
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    tasks={tasks.filter(task => task.projectId === project.id)}
                                    users={users}
                                />
                            ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamView;