document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const loginModal = document.getElementById('loginModal');
  const adminLogin = document.getElementById('adminLogin');
  const customerLogin = document.getElementById('customerLogin');
  const closeModal = document.getElementById('closeModal');
  const userDisplay = document.getElementById('userDisplay');
  const navLinks = document.getElementById('navLinks');

  // Ensure all elements exist before proceeding
  if (!loginButton || !logoutButton || !loginModal || !adminLogin || !customerLogin || !closeModal || !userDisplay || !navLinks) {
    console.error('One or more DOM elements are missing:', {
      loginButton, logoutButton, loginModal, adminLogin, customerLogin, closeModal, userDisplay, navLinks
    });
    return;
  }

  function updateNav(user) {
    const adminLinks = navLinks.querySelectorAll('.admin-only');
    const customerLinks = navLinks.querySelectorAll('.customer-only');

    // Reset all links to hidden
    adminLinks.forEach(link => link.classList.add('hidden'));
    customerLinks.forEach(link => link.classList.add('hidden'));

    if (user.role === 'admin') {
      adminLinks.forEach(link => link.classList.remove('hidden'));
      userDisplay.textContent = `Admin: ${user.username}`;
      loginButton.classList.add('hidden');
      logoutButton.classList.remove('hidden');
    } else if (user.role === 'customer') {
      customerLinks.forEach(link => link.classList.remove('hidden'));
      userDisplay.textContent = user.name ? `Customer: ${user.name}` : 'Guest';
      loginButton.classList.add('hidden');
      logoutButton.classList.remove('hidden');
    } else {
      customerLinks.forEach(link => link.classList.remove('hidden'));
      userDisplay.textContent = 'Guest';
      loginButton.classList.remove('hidden');
      logoutButton.classList.add('hidden');
    }
  }

  loginButton.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
  });

  closeModal.addEventListener('click', () => {
    loginModal.classList.add('hidden');
  });

  adminLogin.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin123') {
      const user = { role: 'admin', username };
      localStorage.setItem('user', JSON.stringify(user));
      updateNav(user);
      loginModal.classList.add('hidden');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid admin credentials');
    }
  });

  customerLogin.addEventListener('click', () => {
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const user = name && email ? { role: 'customer', name, email } : { role: 'guest' };
    localStorage.setItem('user', JSON.stringify(user));
    updateNav(user);
    loginModal.classList.add('hidden');
    window.location.href = 'products.html';
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    updateNav({ role: 'guest' });
    window.location.href = 'index.html';
  });

  // Initialize user state
  const user = JSON.parse(localStorage.getItem('user')) || { role: 'guest' };
  updateNav(user);
});