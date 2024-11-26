// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ------------------- Đăng ký -------------------
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {  // Kiểm tra nếu đang ở trang đăng ký
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            // Kiểm tra mật khẩu có khớp không
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Kiểm tra nếu email đã tồn tại
            const existingUser = localStorage.getItem('user');
            if (existingUser) {
                const user = JSON.parse(existingUser);
                if (user.email === email) {
                    alert("Email already exists. Please use a different email.");
                    return;
                }
            }

            // Lưu thông tin người dùng vào localStorage
            const userData = {
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Registration successful! Please proceed to Login.');

            // Điều hướng sang trang login
            window.location.href = 'login.html';
        });
    }

    // ------------------- Đăng nhập -------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {  // Kiểm tra nếu đang ở trang đăng nhập
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

                // Kiểm tra email và mật khẩu
                if (userData.email === email && userData.password === password) {
                    localStorage.setItem('loggedIn', true);
                    alert('Login successful!');
                    window.location.href = 'index.html';  // Chuyển hướng về trang chủ sau khi đăng nhập
                } else {
                    errorMessage.style.display = 'block';
                }
            } else {
                errorMessage.style.display = 'block';
            }
        });
    }

    // ------------------- Trang chủ -------------------
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userInfo) {  // Kiểm tra nếu đang ở trang chủ
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            const user = JSON.parse(localStorage.getItem('user'));
            userEmail.textContent = user.email;
            userInfo.style.display = 'block';  // Hiển thị thông tin người dùng và nút đăng xuất
            if (loginBtn) loginBtn.style.display = 'none';   // Ẩn nút đăng nhập
            if (registerBtn) registerBtn.style.display = 'none'; // Ẩn nút đăng ký
        }

        // Đăng xuất
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html'; // Quay lại trang chủ sau khi đăng xuất
        });
    }
});
