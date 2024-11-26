// Xử lý đăng ký
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng hành động mặc định của form

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp');
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    // Lưu thông tin người dùng vào LocalStorage
    localStorage.setItem('user', JSON.stringify(user));

    alert('Đăng ký thành công');
    window.location.href = 'login.html';  // Chuyển đến trang đăng nhập
});

// Xử lý đăng nhập
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng hành động mặc định của form

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Đăng nhập thành công');
        window.location.href = 'index.html';  // Chuyển đến trang chủ
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
});
