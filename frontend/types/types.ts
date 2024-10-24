interface Team {
    id: string;
    name: string;
    description?: string;
    memberCount: number;
    members?: User[];
}

interface Project {
    id: string;
    name: string;
    teamId: string;
    description: string;
}

interface Task {
    id: string;
    description: string;
    status: 'completed' | 'in-progress' | 'overdue';
    dueDate: string;
    assignee: string;
    projectId: string;
    priority: 'low' | 'medium' | 'high';
    comments: Comment[];
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    userName: string;
    timestamp: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface Notification {
    id: string;
    type: 'deadline' | 'mention' | 'update';
    message: string;
    timestamp?: string;
}

export type{
    Team,
    Project,
    Task,
    Comment,
    User,
    Notification
}