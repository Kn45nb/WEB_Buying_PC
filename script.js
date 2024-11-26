document.addEventListener('DOMContentLoaded', function() {
    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple login logic (replace with real authentication in production)
            if (email === 'user@example.com' && password === 'password123') {
                alert('Login successful');
                localStorage.setItem('userEmail', email);
                window.location.href = 'index.html';
            } else {
                alert('Login failed. Please check your email and password.');
            }
        });
    }

    // Handle Register
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password === confirmPassword) {
                // Simple registration logic (replace with real user storage in production)
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert('Passwords do not match. Please try again.');
            }
        });
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }

    // Display user info if logged in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        const userInfo = document.getElementById('userInfo');
        const userEmailElement = document.getElementById('userEmail');
        if (userInfo && userEmailElement) {
            userInfo.style.display = 'inline';
            userEmailElement.textContent = userEmail;
            document.querySelector('.tool-bar-right .btn[href="login.html"]').style.display = 'none';
            document.querySelector('.tool-bar-right .btn[href="register.html"]').style.display = 'none';
        }
    }
});
