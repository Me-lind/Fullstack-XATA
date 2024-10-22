import { useEffect, useState } from "react";
import TaskBoard from "../components/TaskBoard"; // Import the TaskBoard component

interface Team {
    id: string;
    name: string;
}

interface Task {
    id: string;
    description: string;
}

export default function Dashboard() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Simulate fetching teams and tasks from an API
    useEffect(() => {
        setTeams([
            { id: "team-1", name: "Development Team" },
            { id: "team-2", name: "Marketing Team" },
        ]);
        setTasks([
            { id: "task-1", description: "Design homepage" },
            { id: "task-2", description: "Set up database" },
        ]);
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Your Teams</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}>{team.name}</li>
                ))}
            </ul>

            <TaskBoard tasks={tasks} /> {/* Use the TaskBoard component */}
        </div>
    );
}
