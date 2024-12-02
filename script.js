//Reg
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm)
    {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        registerForm.addEventListener('submit', function(event)
        {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (password !== confirmPassword)
            {
                alert("Passwords do not match!");
                return;
            }

            const existingUser = localStorage.getItem('user');
            if (existingUser)
                {
                    const user = JSON.parse(existingUser);
                    if (user.email === email)
                    {
                        alert("Email already exists. Please use a different email.");
                        return;
                    }
                }

            const userData = 
            {
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Registration successful! Please proceed to Login.');

            window.location.href = 'login.html';
        });
    }

//Log
    const loginForm = document.getElementById('loginForm');
    if (loginForm)
    {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMessage = document.getElementById('errorMessage');

        loginForm.addEventListener('submit', function(event)
        {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const user = localStorage.getItem('user');
            if (user)
            {
                const userData = JSON.parse(user);

                if (userData.email === email && userData.password === password)
                {
                    localStorage.setItem('loggedIn', true);
                    alert('Login successful!');
                    window.location.href = 'index.html';
                }
                else errorMessage.style.display = 'block';
            }
            else errorMessage.style.display = 'block';
        });
    }

//Home
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userInfo)
    {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn)
        {
            const user = JSON.parse(localStorage.getItem('user'));
            userEmail.textContent = user.email;
            userInfo.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
        }

    //LogOut
        logoutBtn.addEventListener('click', function()
        {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }
});

//Cart
document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin người dùng hiện tại
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('loggedIn');
    const userEmail = user ? user.email : null;
    
    // Giỏ hàng được liên kết với email của người dùng
    let cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];

    // Logic Thêm to Cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (!loggedIn) {
                    alert('Please login to add items to your cart.');
                    return;
                }

                const product = this.parentElement;
                const productId = product.dataset.id;
                const productName = product.dataset.name;
                const productPrice = product.dataset.price;

                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    alert('Product already in cart!');
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice });
                    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
                    alert(`${productName} added to cart!`);
                }
            });
        });
    }

    // Logic Main Cart
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkoutBtn');

    if (cartItemsContainer && checkoutButton) {
        function displayCart() {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML =
                `
                    <div class="cart-item">
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                    <p>${item.name} - $${item.price}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        window.removeFromCart = function(index) {
            cart.splice(index, 1);
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
            displayCart();
        }

        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Payment successful!');
            localStorage.removeItem(`cart_${userEmail}`);
            cart = [];
            displayCart();
        });

        displayCart();
    }
    

    // Logic User
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmailElement = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userInfo && loggedIn) {
        userEmailElement.textContent = userEmail;
        userInfo.style.display = 'block';
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }
});

// Mix image
document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll('.product'); // Lấy tất cả các sản phẩm trên trang

    products.forEach(product => {
        const imageContainer = product.querySelector('img');  // Lấy thẻ img trong sản phẩm
        const folderPath = product.getAttribute('data-folder');  // Lấy đường dẫn thư mục chứa ảnh

        // Danh sách ảnh cố định: image1.png và image2.png
        const imageFiles = ['image1.png', 'image2.png'];  

        let currentIndex = 0;

        // Cập nhật ảnh mỗi 5 giây
        setInterval(() => {
            // Thêm lớp fade vào ảnh hiện tại để làm mờ
            imageContainer.classList.add('fade');

            // Chờ 1 giây (thời gian fade-out), sau đó thay đổi ảnh
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % imageFiles.length;  // Chuyển đến ảnh tiếp theo
                imageContainer.src = `${folderPath}/${imageFiles[currentIndex]}`;  // Thay đổi ảnh
                imageContainer.classList.remove('fade'); // Loại bỏ lớp fade để ảnh mới hiện lên

            }, 1000); // 1 giây (thời gian fade-out)
        }, 5000); // 5 giây để chuyển ảnh
    });
});

//Copyright © 2024 DAtW KN45NB - All rights reserved. Permission is granted to copy, distribute, or modify this work under the Creative Commons (CC) license.