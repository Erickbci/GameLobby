const signInButton = document.querySelector('.sign-in-button');
const signUpButton = document.querySelector('.sign-up-button');
const signInModal = document.querySelector('.sign-in-modal');
const signUpModal = document.querySelector('.sign-up-modal');
const buttonInClose = document.querySelector('.buttonInClose');
const buttonUpClose = document.querySelector('.buttonUpClose');

signInButton.onclick = function () {
    signInModal.showModal()
}

signUpButton.onclick = function () {
    signUpModal.showModal()
}

buttonInClose.onclick = function () {
    signInModal.close()
}

buttonUpClose.onclick = function () {
    signUpModal.close()
}