function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

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
            askForLogin()
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
            askForLogin()
        }
    })
})
