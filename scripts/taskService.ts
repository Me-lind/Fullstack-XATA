export const taskService = {
    fetchProjects: async () => {
      const response = await fetch('/projects', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    },
    fetchTasks: async (projectId: string) => {
      const response = await fetch(`/projects/${projectId}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    },
    updateTaskStatus: async (taskId: string, status: string) => {
      const response = await fetch(`/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    fetchTeams: async () => {
      const response = await fetch('/teams', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    },
    createTeam: async (name: string, description: string) => {
      const response = await fetch('/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, description }),
      });
      return response.json();
    },
  };
  