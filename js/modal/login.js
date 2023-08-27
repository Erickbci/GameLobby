// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     window.location.href = '../../index.html';
//   }
// })

function loginOnChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function loginOnChangePassword() {
  toggleButtonsDisable();
  togglePasswordError();
}

function getUserEmail() {
  firebase.getAuth().getUserByEmail(email)
  .then((userRecord) => {
    console.log(userRecord.toJSON());
  })
  .catch((error) => {
    console.log(error);
  })
}

function connectedUserSettings() {
  const signInModal = document.querySelector('.sign-in-modal');
  const slider = document.querySelector('.container')
  const headerButtons = document.querySelector('.header-buttons');	
  const connectedUserSettingsDiv = document.querySelector('.connected-user-settings-div');

  signInModal.close()
  slider.style.display = 'flex'
  headerButtons.style.display = 'none';
  connectedUserSettingsDiv.style.display = 'flex'

  getUserEmail()
}


function login(){
  
  showLoading();
  firebase.auth().signInWithEmailAndPassword(
    loginForm.email().value, loginForm.password().value
  ).then(response => {
    hideLoading();
    connectedUserSettings()
  }).catch(error => {
    hideLoading();
    alert(getErrorMessages(error))
  })
}

function getErrorMessages(error){
  if(error.code == 'auth/user-not-found'){
    return "Usuário nao encontrado";
  }
  if (error.code == 'auth/wrong-password'){
    return "Senha inválida"
  }
  return error.message;
}

function recoverPassword() {
  showLoading();
  firebase.auth().sendPasswordResetEmail(
    loginForm.email().value
    ).then(() => {
      hideLoading();
      alert('Email enviado com sucesso')
    }).catch(error => {
      hideLoading();
      alert(getErrorMessages(error));
    })
}

function isEmailValid() {
  const email = loginForm.email().value
  if (!email) {
    return false;
  }
  return validateEmail(email)
}

function toggleEmailErrors() {
  const email = loginForm.email().value
  loginForm.emailRequiredError().style.display = email ? 'none' : 'block';
  loginForm.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
}

function togglePasswordError() {
  const password = loginForm.password().value;
  loginForm.passwordRequiredError().style.display = password ? 'none' : 'block';
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  loginForm.recoverPassword().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  loginForm.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
  const password = loginForm.password().value
  if (!password) {
    return false;
  }
  return true;
}

function seePassword() {
  if (loginForm.password().type === 'password') {
    loginForm.password().type = 'text';
    loginForm.seePasswordImage().setAttribute('src', './images/olho.svg');   
    return;
  } else {
    loginForm.password().type = 'password';
    loginForm.seePasswordImage().setAttribute('src', './images/olho-fechado.svg');
  } 

}


const loginForm = {
  email: () => document.getElementById('s-i-email'),
  emailInvalidError: () => document.getElementById('s-i-email-invalid-error'),
  emailRequiredError: () => document.getElementById('s-i-email-required-error'),
  loginButton: () => document.getElementById('login-button'),
  password: () => document.getElementById('s-i-password'),
  passwordRequiredError: () => document.getElementById('s-i-password-required-error'),
  recoverPassword: () => document.getElementById('recover-password-button'),
  seePasswordImage: () => document.getElementById('see-password-img')
}