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
    status: 'pending' | 'in-progress' | 'completed';
    name: string;
    duedate: string;
    assignedToId: string;
    projectId: string;
    priority?: 'low' | 'medium' | 'high';
    comments?: {
        content: string;
        id?: string;
        createdAt: string;
    }[];
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