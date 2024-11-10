// Handle form submission
document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Add contact form logic here
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    alert('Thank you for reaching out! We will get back to you shortly.');
};
