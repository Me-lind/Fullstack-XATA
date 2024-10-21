import { apiService } from '../../scripts/apiService';

const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;

    if (!emailInput || !passwordInput) {
      alert('Email or password input not found.');
      return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const data = await apiService.login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      } else {
        alert('Login failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  });
} else {
  console.error('Login form not found in the DOM.');
}
