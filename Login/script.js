// Xử lý Đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Kiểm tra nếu người dùng đã tồn tại
    if (localStorage.getItem(username)) {
        document.getElementById('message').textContent = 'Tên người dùng đã tồn tại!';
    } else {
        // Lưu dữ liệu người dùng vào LocalStorage
        localStorage.setItem(username, password);
        document.getElementById('message').textContent = 'Đăng ký thành công!';
    }
});

// Xử lý Đăng nhập
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Kiểm tra thông tin đăng nhập
    if (localStorage.getItem(username) === password) {
        document.getElementById('message').textContent = 'Đăng nhập thành công!';
        // Chuyển hướng hoặc thực hiện hành động khác sau khi đăng nhập
        window.location.href = 'profile.html'; // Ví dụ chuyển đến trang hồ sơ
    } else {
        document.getElementById('message').textContent = 'Tên người dùng hoặc mật khẩu không đúng!';
    }
});
