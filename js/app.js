const userNameInput = document.getElementById('user-name');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('sign-in-btn');

signInButton.addEventListener('click', () => {
  const userName = userNameInput.value.trim();
  const password = passwordInput.value.trim();
 

  if (userName === 'admin' && password === 'admin123') {
    alert('Sign in successful!');
    location.assign('./main.html');
  } else {
    alert('Invalid username or password. Please try again.');
  }
});