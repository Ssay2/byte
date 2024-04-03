document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            if (!validateLoginForm()) {
                e.preventDefault(); // Prevent form submission
            }
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            if (!validateRegistrationForm()) {
                e.preventDefault(); // Prevent form submission
            }
        });
    }

    function validateLoginForm() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return false;
        }

        // Add more validation as needed

        return true;
    }

    function validateRegistrationForm() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        // Add more validation as needed

        return true;
    }
});
