document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Fetch form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Handle user registration
    if (registerUser(name, email, password)) {
        alert("Registration successful! Redirecting to login...");
        window.location.href = "./login.html"; // Redirect to login page
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fetch existing users or initialize empty list
let users = JSON.parse(localStorage.getItem("userList")) || [];

function registerUser(name, email, password) {
    // Check if the user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("User with this email already exists.");
        return false;
    }

    // Create a new user object
    const newUser = {
        id: Date.now(), // Unique ID
        name: name,
        email: email,
        password: password
    };

    // Add the user to the list and update localStorage
    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    return true;
}