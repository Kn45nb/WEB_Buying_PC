document.addEventListener('DOMContentLoaded', function () {
    // Reg
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (!email || !password || !confirmPassword) {
                alert('All fields are required.');
                return;
            }

            if (!email.includes('@') || email.split('@')[1].split('.').length < 2) {
                alert('Invalid email address.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const existingUser = localStorage.getItem('user');
            if (existingUser) {
                const user = JSON.parse(existingUser);
                if (user.email === email) {
                    alert('Email already exists. Please use a different email.');
                    return;
                }
            }

            const userData = { email, password };
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Registration successful! Please proceed to Login.');
            window.location.href = 'login.html';
        });
    }

    // Log
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMessage = document.getElementById('errorMessage');

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert('Email and Password are required.');
                return;
            }

            const user = localStorage.getItem('user');
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    if (userData.email === email && userData.password === password) {
                        localStorage.setItem('loggedIn', "true");
                        alert('Login successful!');
                        window.location.href = 'index.html';
                    } else {
                        errorMessage.style.display = 'block';
                    }
                } catch (error) {
                    alert('Error processing user data. Please try again.');
                }
            } else {
                alert('No registered user found. Please sign up first.');
            }
        });
    }

    // Home Logic
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userInfo) {
        const loggedIn = localStorage.getItem('loggedIn') === "true";
        if (loggedIn) {
            const user = JSON.parse(localStorage.getItem('user'));
            userEmail.textContent = user.email;
            userInfo.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
        }

        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Cart Logic
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('loggedIn') === "true";
    const userEmailValue = user ? user.email : null;

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem(`cart_${userEmailValue}`)) || [];
    } catch {
        cart = [];
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
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
                    localStorage.setItem(`cart_${userEmailValue}`, JSON.stringify(cart));
                    alert(`${productName} added to cart!`);
                }
            });
        });
    }

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
                    `<div class="cart-item">
                        <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                        <p>${item.name} - $${item.price}</p>
                    </div>`;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        window.removeFromCart = function (index) {
            cart.splice(index, 1);
            localStorage.setItem(`cart_${userEmailValue}`, JSON.stringify(cart));
            displayCart();
        };

        checkoutButton.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Payment successful!');
            localStorage.removeItem(`cart_${userEmailValue}`);
            cart = [];
            displayCart();
        });

        displayCart();
    }

    // Product Image Logic
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const imageContainer = product.querySelector('img');
        const folderPath = product.getAttribute('data-folder');
        const imageFiles = ['image1.png', 'image2.png'];
        let currentIndex = 0;

        setInterval(() => {
            imageContainer.classList.add('fade');
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % imageFiles.length;
                imageContainer.src = `${folderPath}/${imageFiles[currentIndex]}`;
                imageContainer.classList.remove('fade');
            }, 500);
        }, 5000);
    });
});

//Copyright © 2024 DAtW KN45NB - All rights reserved. Permission is granted to copy, distribute, or modify this work under the Creative Commons (CC) license.