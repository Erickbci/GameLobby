firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location.href = '../game/game.html';
    }
  })

function registerOnChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';

    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    toggleRegisterButtonDisable()
}

function registerOnChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';

    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
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
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
    password == confirmPassword ? 'none' : 'block'
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6){
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
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