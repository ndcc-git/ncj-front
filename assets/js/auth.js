/* ========================================
   10th NCJ Website - Authentication JavaScript
   ======================================== */

// ========================================
// Initialize Auth State on Page Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
});

// ========================================
// Check Authentication State
// ========================================
function checkAuthState() {
    const user = localStorage.getItem('ncj_user');
    const authGuest = document.getElementById('auth-guest');
    const authLoggedIn = document.getElementById('auth-logged-in');

    if (user && authGuest && authLoggedIn) {
        authGuest.style.display = 'none';
        authLoggedIn.classList.add('active');
    }
}

// ========================================
// Logout Handler
// ========================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('ncj_user');
        window.location.href = 'index.html';
    }
}

// ========================================
// Password Visibility Toggle
// ========================================
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = event.currentTarget.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ========================================
// Password Strength Meter
// ========================================
function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('password-strength-bar');
    if (!strengthBar) return;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Set visual strength
    strengthBar.className = 'password-strength-bar';

    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// ========================================
// Sign Up Form Handler
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        // Password strength checker
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const passwordMatchMsg = document.getElementById('password-match-msg');

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                checkPasswordStrength(passwordInput.value);
                checkPasswordMatch();
            });
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', checkPasswordMatch);
        }

        function checkPasswordMatch() {
            if (passwordInput && confirmPasswordInput && passwordMatchMsg) {
                if (confirmPasswordInput.value !== '') {
                    if (passwordInput.value === confirmPasswordInput.value) {
                        passwordMatchMsg.textContent = '✓ Passwords match';
                        passwordMatchMsg.style.color = '#00C851';
                    } else {
                        passwordMatchMsg.textContent = '✗ Passwords do not match';
                        passwordMatchMsg.style.color = '#ff4444';
                    }
                } else {
                    passwordMatchMsg.textContent = '';
                }
            }
        }

        // Form submission
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                fullname: document.getElementById('fullname').value,
                institution: document.getElementById('institution').value,
                class: document.getElementById('class').value,
                mobile: document.getElementById('mobile').value,
                address: document.getElementById('address').value,
                email: document.getElementById('email').value,
                facebook: document.getElementById('facebook').value,
            };

            // Validate passwords match
            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Passwords do not match!');
                return;
            }

            // Save user to localStorage (demo purposes)
            localStorage.setItem('ncj_user', JSON.stringify(formData));

            // Show success and redirect
            alert('Account created successfully! Welcome to 10th NCJ.');
            window.location.href = 'profile.html';
        });
    }
});

// ========================================
// Sign In Form Handler
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // In real app, validate against backend
            // For demo, we'll just check if user exists
            const storedUser = localStorage.getItem('ncj_user');

            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.email === email) {
                    alert('Sign in successful!');
                    window.location.href = 'profile.html';
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            } else {
                alert('No account found. Please sign up first.');
            }
        });
    }
});

// ========================================
// Forgot Password Form Handler
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('forgot-email').value;

            // Simulate sending reset link
            alert(`Password reset link has been sent to ${email}`);
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1000);
        });
    }
});

// ========================================
// Change Password Form Handler
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('change-password-form');

    if (changePasswordForm) {
        const newPasswordInput = document.getElementById('new-password');

        // Real-time validation checks
        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', () => {
                const password = newPasswordInput.value;

                // Length check
                const lengthCheck = document.getElementById('length-check');
                if (lengthCheck) {
                    if (password.length >= 8) {
                        lengthCheck.classList.add('valid');
                        lengthCheck.querySelector('i').classList.replace('fa-circle', 'fa-check-circle');
                    } else {
                        lengthCheck.classList.remove('valid');
                        lengthCheck.querySelector('i').classList.replace('fa-check-circle', 'fa-circle');
                    }
                }

                // Uppercase check
                const uppercaseCheck = document.getElementById('uppercase-check');
                if (uppercaseCheck) {
                    if (/[A-Z]/.test(password)) {
                        uppercaseCheck.classList.add('valid');
                        uppercaseCheck.querySelector('i').classList.replace('fa-circle', 'fa-check-circle');
                    } else {
                        uppercaseCheck.classList.remove('valid');
                        uppercaseCheck.querySelector('i').classList.replace('fa-check-circle', 'fa-circle');
                    }
                }

                // Lowercase check
                const lowercaseCheck = document.getElementById('lowercase-check');
                if (lowercaseCheck) {
                    if (/[a-z]/.test(password)) {
                        lowercaseCheck.classList.add('valid');
                        lowercaseCheck.querySelector('i').classList.replace('fa-circle', 'fa-check-circle');
                    } else {
                        lowercaseCheck.classList.remove('valid');
                        lowercaseCheck.querySelector('i').classList.replace('fa-check-circle', 'fa-circle');
                    }
                }

                // Number check
                const numberCheck = document.getElementById('number-check');
                if (numberCheck) {
                    if (/[0-9]/.test(password)) {
                        numberCheck.classList.add('valid');
                        numberCheck.querySelector('i').classList.replace('fa-circle', 'fa-check-circle');
                    } else {
                        numberCheck.classList.remove('valid');
                        numberCheck.querySelector('i').classList.replace('fa-check-circle', 'fa-circle');
                    }
                }
            });
        }

        // Form submission
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;

            // Validate new passwords match
            if (newPassword !== confirmNewPassword) {
                alert('New passwords do not match!');
                return;
            }

            // Validate password requirements
            if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) ||
                !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
                alert('Password does not meet requirements!');
                return;
            }

            // Simulate password change
            alert('Password changed successfully!');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        });
    }
});
