// Get modal elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtns = document.getElementsByClassName('close');

// Open login modal
loginBtn.onclick = function() {
    loginModal.style.display = 'block';
}

// Close modals
for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        loginModal.style.display = 'none';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
}

// Handle login form submission
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    // Add login logic here
    console.log('Login form submitted');
    loginModal.style.display = 'none';
}

// Handle registration form submission
document.getElementById('registrationForm').onsubmit = function(e) {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration form submitted');
    alert('Registration successful!');
    // Redirect to home page or login page
    window.location.href = 'index.html';
}