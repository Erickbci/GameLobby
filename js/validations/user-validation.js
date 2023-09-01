const gameButtonAmongUs = document.querySelector('#game-button-among-us');
const gameButtonCsgo = document.querySelector('#game-button-csgo');
const gameButtonRickAndMorty = document.querySelector('#game-button-rick-and-morty');

gameButtonAmongUs.addEventListener('click', (eve) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (eve.target.value === 'among-us') {
                window.location.href = '../../pages/amongUsGame/index.html';
            }
        } else {
            askForLogin()
        }
    })
})
gameButtonCsgo.addEventListener('click', (eve) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (eve.target.value === 'csgo') {
                window.location.href = '../../pages/ticTacToe/index.html';
            }
        } else {
            alert('Please loggin')
        }
    })
})
gameButtonRickAndMorty.addEventListener('click', (eve) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (eve.target.value === 'rick-and-morty') {
                window.location.href = '../../pages/rickAndMortyGame/index.html';
            }
        } else {
            alert('Please loggin')
        }
    })
})
