// Reg
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

    alert('Registration successful! Nẽt to Login');

    window.location.href = 'login.html';
});

// Log
const loginForm = document.getElementById('loginForm');
const emailInputLogin = document.getElementById('email');
const passwordInputLogin = document.getElementById('password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInputLogin.value.trim();
    const password = passwordInputLogin.value.trim();

    const existingUser = localStorage.getItem('user');

    if (existingUser) {
        const user = JSON.parse(existingUser);

        if (user.email === email && user.password === password) {
            // Lưu trạng thái đăng nhập vào localStorage và chuyển hướng về trang chủ
            localStorage.setItem('loggedIn', true);
            alert("Login successful!");
            window.location.href = 'index.html';
        } else {
            alert("Invalid email or password. Please try again.");
        }
    } else {
        alert("No user found. Please register first.");
    }
});

// ========================== Trạng thái Đăng nhập trên trang chủ ==========================
document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loggedIn) {
        // Hiển thị thông tin người dùng và ẩn nút Login và Register
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userInfo.style.display = 'block';

        // Hiển thị email người dùng
        const user = JSON.parse(localStorage.getItem('user'));
        userEmail.textContent = `Welcome, ${user.email}`;

        // Đăng xuất
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';  // Quay lại trang chủ sau khi logout
        });
    }
});