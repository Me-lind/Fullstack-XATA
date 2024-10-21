import { taskService } from '../../scripts/taskService';

const projectsDiv = document.getElementById('projects');

async function fetchProjects() {
  if (!projectsDiv) {
    console.error('The projectsDiv element is missing in the DOM.');
    return;
  }

  try {
    const projects = await taskService.fetchProjects();
    projectsDiv.innerHTML = '';

    projects.forEach((project: { id: string; name: string; description: string }) => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-item';
      projectDiv.innerText = `${project.name} - ${project.description}`;
      projectDiv.addEventListener('click', () => {
        window.location.href = `/taskBoard.html?projectId=${project.id}`;
      });
      projectsDiv.appendChild(projectDiv);
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    alert('Failed to fetch projects');
  }
}

fetchProjects();
