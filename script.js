// Registration
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const existingUser = localStorage.getItem('user');
    if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.email === email) {
            alert("Email already exists. Please use a different email.");
            return;
        }
    }

    const userData = {
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(userData));

    alert('Registration successful! Next to Login');

    window.location.href = 'login.html';
});

// Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);

            if (userData.email === email && userData.password === password) {
                localStorage.setItem('loggedIn', 'true'); // Chuyển giá trị 'true' thành chuỗi
                alert('Login successful! Redirecting to Home Page'); // Thêm thông báo đăng nhập thành công
                window.location.href = 'index.html';  // Chuyển hướng về trang chủ sau khi đăng nhập
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Invalid email or password'; // Thêm thông báo lỗi
            }
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Invalid email or password'; // Thêm thông báo lỗi
        }
    });
});
