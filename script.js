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
            else
            {
                errorMessage.style.display = 'block';
            }
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
            if (loginBtn) loginBtn.style.display = 'none';          //@Kn45nb Code lỗi
            if (registerBtn) registerBtn.style.display = 'none';    //
        }

    //LogOut
        logoutBtn.addEventListener('click', function()
        {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }
});
