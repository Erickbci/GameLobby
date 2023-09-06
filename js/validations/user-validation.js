const gameButtonAmongUs = document.querySelector('#game-button-among-us');
const gameButtonCsgo = document.querySelector('#game-button-csgo');
const gameButtonRickAndMorty = document.querySelector('#game-button-rick-and-morty');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUserSettingsAmong()
    }
  })

  function setUserSettingsAmong() {
    const user = firebase.auth().currentUser;
    const connectedUserSettingsDiv = document.querySelector('.connected-user-settings-div');
  
    if (user !== null) {
      user.providerData.forEach((profile) => {
        const userEmail = profile.email;
        connectedUserSettingsDiv.style.display = 'flex'
        connectedUserSettingsDiv.innerHTML = `
        <span class="connected-span">Conectado, <span class="connected-user">${userEmail}</span></span>
        <a onclick="confirmLogout()"><img class="logout-button icon" src="../../../images/logout.svg" /></a>`
      });
    }
    
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
