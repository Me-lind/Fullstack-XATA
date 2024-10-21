import { apiService } from '../../scripts/apiService';

const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;

    if (!nameInput || !emailInput || !passwordInput) {
      alert('One or more input fields are missing.');
      return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const data = await apiService.register(name, email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    }
  });
} else {
  console.error('Signup form not found in the DOM.');
}
