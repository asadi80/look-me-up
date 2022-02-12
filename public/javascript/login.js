
const user = document.getElementById("userName");
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/user_profile');
    } else {
      alert(response.statusText);
    }
  }
  user.innerHTML=email;
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


