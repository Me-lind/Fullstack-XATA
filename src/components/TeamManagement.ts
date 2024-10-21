import { taskService } from '../../scripts/taskService';

const teamForm = document.getElementById('teamForm');
const teamList = document.getElementById('teamList');

async function fetchTeams() {
  if (!teamList) return;
  try {
    const teams = await taskService.fetchTeams();
    teamList.innerHTML = '';

    teams.forEach((team: { id: string; name: string; description: string }) => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'team-item';
      teamDiv.innerText = `${team.name} - ${team.description}`;
      teamList.appendChild(teamDiv);
    });
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    alert('Failed to fetch teams');
  }
}

if (teamForm) {
  teamForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const teamNameInput = document.getElementById('teamName') as HTMLInputElement | null;
    const teamDescriptionInput = document.getElementById('teamDescription') as HTMLInputElement | null;

    if (!teamNameInput || !teamDescriptionInput) {
      alert('Team name or description input not found.');
      return;
    }

    const teamName = teamNameInput.value;
    const teamDescription = teamDescriptionInput.value;

    try {
      const response = await taskService.createTeam(teamName, teamDescription);
      if (response.success) {
        alert('Team created successfully');
        fetchTeams();
      } else {
        alert('Failed to create team');
      }
    } catch (error) {
      console.error('Failed to create team:', error);
      alert('An error occurred while creating the team.');
    }
  });
} else {
  console.error('Team form not found in the DOM.');
}

fetchTeams();
