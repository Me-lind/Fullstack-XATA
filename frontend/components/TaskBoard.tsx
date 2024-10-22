// components/TaskBoard.tsx
interface Task {
    id: string;
    description: string;
}

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.description}</li>
                ))}
            </ul>
        </div>
    );
}
