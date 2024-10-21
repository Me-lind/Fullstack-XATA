import { taskService } from '@scripts/taskService';  
const projectsDiv = document.getElementById('projects');

async function fetchProjects() {
  if (!projectsDiv) {
    console.error('The projectsDiv element is missing in the DOM.');
    return;
  }

  // Show a loading message while fetching
  projectsDiv.innerHTML = '<p>Loading projects...</p>';

  try {
    const projects = await taskService.fetchProjects();
    projectsDiv.innerHTML = ''; // Clear loading message after data is fetched

    if (projects.length === 0) {
      projectsDiv.innerHTML = '<p>No projects found.</p>'; // Handle empty project list
      return;
    }

    // Populate the DOM with the projects
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
    projectsDiv.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    alert('Failed to fetch projects');
  }
}

// Fetch projects when the page loads
fetchProjects();
