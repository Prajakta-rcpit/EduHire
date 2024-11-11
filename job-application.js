// Dummy data for school information
const schoolData = {
    sunshine: {
        name: "R.C. Patel Secondary School",
        position: "Elementary School Teacher",
        salaryRange: "RS. 40,000 - 60,000",
        location: "Shirpur, IN",
        description: "We are seeking passionate elementary school teachers to join our team at Sunshine Elementary. The ideal candidate should have experience in creating engaging lesson plans and fostering a positive learning environment for young students."
    },
    evergreen: {
        name: "R.C. Patel Polytechnic",
        position: "Assistant Professor of Python",
        salaryRange: "Rs. 50,000 - 75,000",
        location: "Dhule, IN",
        description: "R.C. Patel Polytechnic is looking for an experienced high school Python programming teacher. The successful candidate will be responsible for teaching Python programming and other foundational computer science concepts to students."
    },
    oakwood: {
        name: "R.C. Patel Institute of Technology",
        position: "Assistant Professor of Computer Science",
        salaryRange: "Rs. 70,000 - 90,000",
        location: "Shirpur, IN",
        description: "R.C. Patel Institute of Technology is seeking an Assistant Professor of Computer Science to join our growing department. The ideal candidate should have a Ph.D. in Computer Science or a related field and be passionate about teaching and research."
    }
};

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

// Get school information from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const school = urlParams.get('school');

// Display school information
const schoolInfo = document.getElementById('school-info');
if (school &&

 schoolData[school]) {
    const data = schoolData[school];
    schoolInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Salary Range:</strong> ${data.salaryRange}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Description:</strong> ${data.description}</p>
    `;
} else {
    schoolInfo.innerHTML = '<p>R.C. Patel</p>';
}

// Handle job application form submission
document.getElementById('jobApplicationForm').onsubmit = function(e) {
    e.preventDefault();
    // Add job application logic here
    console.log('Job application submitted');
    alert('Application submitted successfully!');
    // Redirect to home page or confirmation page
    window.location.href = 'index.html';
}