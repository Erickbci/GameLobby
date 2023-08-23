// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       window.location.href = '../game/game.html';
//     }
//   })

function registerOnChangeEmail() {
    const email = registerForm.email().value;
    registerForm.emailRequiredError().style.display = email ? 'none' : 'block';

    registerForm.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    toggleRegisterButtonDisable()
}

function registerOnChangePassword() {
    const password = registerForm.password().value;
    registerForm.passwordRequiredError().style.display = password ? 'none' : 'block';

    registerForm.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const email = registerForm.email().value;
    const password = registerForm.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
        ).then(() => {
            hideLoading();
            window.location.href = '../../pages/game/game.html';
        }).catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        })
}

function getErrorMessage(error) {
    if (error.code == 'auth/email-already-in-use') {
        return 'Email já está em uso';
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = registerForm.password().value;
    const confirmPassword = registerForm.confirmPassword().value;

    registerForm.confirmPasswordDoesntMatchError().style.display = 
    password == confirmPassword ? 'none' : 'block'
}

function toggleRegisterButtonDisable() {
    registerForm.registerButton().disabled = !isregisterFormValid();
}

function isregisterFormValid() {
    const email = registerForm.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = registerForm.password().value;
    if (!password || password.length < 6){
        return false;
    }

    const confirmPassword = registerForm.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const registerForm = {
    email: () => document.getElementById('s-u-email'),
    emailInvalidError: () => document.getElementById('s-u-email-invalid-error'),
    emailRequiredError: () => document.getElementById('s-u-email-required-error'),
    registerButton: () => document.getElementById('register-button'),
    password: () => document.getElementById('s-u-password'),
    passwordRequiredError: () => document.getElementById('s-u-password-required-error'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
}