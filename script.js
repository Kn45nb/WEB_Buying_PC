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
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
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
