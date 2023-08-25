const signInButton = document.querySelector('.sign-in-button');
const signUpButton = document.querySelector('.sign-up-button');
const signInModal = document.querySelector('.sign-in-modal');
const signUpModal = document.querySelector('.sign-up-modal');
const buttonInClose = document.querySelector('.buttonInClose');
const buttonUpClose = document.querySelector('.buttonUpClose');

const slider = document.querySelector('.container')

signInButton.onclick = function () {
    signInModal.showModal()
    slider.style.display = 'none'
}

signUpButton.onclick = function () {
    signUpModal.showModal()
    slider.style.display = 'none'
}

buttonInClose.onclick = function () {
    signInModal.close()
    slider.style.display = 'flex'
}

buttonUpClose.onclick = function () {
    signUpModal.close()
    slider.style.display = 'flex'
}