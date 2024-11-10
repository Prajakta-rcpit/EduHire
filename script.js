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

// Handle form submissions
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    // Add login logic here
    console.log('Login form submitted');
    loginModal.style.display = 'none';
}

// Handle search
document.getElementById('searchBtn').onclick = function() {
    const searchTerm = document.getElementById('searchInput').value;
    // Add search logic here
    console.log('Searching for:', searchTerm);
}

// Handle filter changes
const filters = document.querySelectorAll('.filters select');
filters.forEach(filter => {
    filter.onchange = function() {
        // Add filter logic here
        console.log('Filter changed:', filter.id, filter.value);
    }
});