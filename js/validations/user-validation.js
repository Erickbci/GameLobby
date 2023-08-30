const cardButton = document.querySelector('#card-button');
const buttonCsgo = document.querySelector('#buttonCsgo');
const buttonRick = document.querySelector('#buttonRick');


cardButton.addEventListener('click', (eve) => {
    if (eve.target.value === 'amongus') {
        window.location.href = '../../pages/amongUsGame/index.html';
    } 
})

buttonCsgo.addEventListener('click', (eve) => {
    if (eve.target.value === 'counter') {
        window.location.href = '../../pages/ticTacToe/index.html';
    } 
})

buttonRick.addEventListener('click', (eve) => {
    if (eve.target.value === 'rickandmorty') {
        window.location.href = '../../pages/rickAndMortyGame/index.html';
    } 
})


//     // firebase.auth().onAuthStateChanged(user => {
//     //     if (user) {
//     //     }
//     //   })
