import { taskService } from '../../scripts/taskService';

// Extract projectId from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

if (!projectId) {
  alert('Project ID is missing');
}

// Elements
const todoColumn = document.getElementById('todo');
const inProgressColumn = document.getElementById('in-progress');
const completedColumn = document.getElementById('completed');

if (!todoColumn || !inProgressColumn || !completedColumn) {
  console.error('One or more columns are missing in the DOM.');
}

// Function to fetch tasks
async function fetchTasks() {
  try {
    const tasks = await taskService.fetchTasks(projectId!);

    // Clear existing tasks
    [todoColumn, inProgressColumn, completedColumn].forEach((column) => {
      if (column) column.innerHTML = `<h3>${column.id.replace('-', ' ').toUpperCase()}</h3>`;
    });

    tasks.forEach((task: { id: string; title: string; status: string }) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      taskDiv.draggable = true;
      taskDiv.id = `task-${task.id}`;
      taskDiv.innerText = task.title;

      taskDiv.addEventListener('dragstart', (e) => {
        const event = e as DragEvent;
        if (event.dataTransfer) {
          event.dataTransfer.setData('text/plain', taskDiv.id);
        }
      });

      switch (task.status) {
        case 'todo':
          todoColumn?.appendChild(taskDiv);
          break;
        case 'in-progress':
          inProgressColumn?.appendChild(taskDiv);
          break;
        case 'completed':
          completedColumn?.appendChild(taskDiv);
          break;
      }
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    alert('Failed to fetch tasks');
  }
}

// Drag and Drop Event Listeners
[...document.querySelectorAll('.column')].forEach((column) => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  column.addEventListener('drop', async (e) => {
    e.preventDefault();
    const event = e as DragEvent;
    const taskId = event.dataTransfer?.getData('text/plain');
    const taskElement = document.getElementById(taskId || '');

    if (taskElement && taskElement instanceof HTMLElement) {
      column.appendChild(taskElement);

      // Update task status
      const newStatus = column.id;
      const taskIdNumber = taskId?.replace('task-', '');

      try {
        await taskService.updateTaskStatus(taskIdNumber!, newStatus);
      } catch (error) {
        console.error('Failed to update task status:', error);
        alert('Failed to update task status');
      }
    }
  });
});

fetchTasks();
