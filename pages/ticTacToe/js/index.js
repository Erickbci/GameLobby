let chooseTeamAudio = document.getElementById('select-team-audio')
let readyAudio1 = document.getElementById('ready-audio1')
let readyAudio2 = document.getElementById('ready-audio2')
let bombHasBeenPlantedAudio = document.getElementById('bomb-has-been-planted-audio')
let ctWinAudio = document.getElementById('ct-win-audio')
let trWinAudio = document.getElementById('tr-win-audio')
chooseTeamAudio.play()


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUserSettingsCsgo()
    }
  })
  
  function setUserSettingsCsgo() {
    const user = firebase.auth().currentUser;
    const connectedUserSettingsDivCsgo = document.querySelector('.connected-user-settings-div');
  
    if (user !== null) {
      user.providerData.forEach((profile) => {
        const userEmail = profile.email;
        connectedUserSettingsDivCsgo.style.display = 'flex'
        connectedUserSettingsDivCsgo.innerHTML = `
        <span class="connected-span">Conectado, <span class="connected-user">${userEmail}</span></span>
        <a onclick="confirmLogout()"><img class="logout-button icon" src="../../../images/logout.svg" /></a>`
      });
    }
    
  }

const boardRegions = document.querySelectorAll('#gameBoard span');
const gameBoard = document.getElementById('gameBoard')
const startButton = document.getElementById('start')

let vBoard = []
let turnPlayer = ''

function onChangeInputs() {
    chooseTeamAudio.pause()
    readyAudio1.play()
    toggleButtonDisable();
}

document.getElementById('player2').addEventListener('change', onChangeInputs)

function isInputValid() {
    const inputPlayer1 = document.getElementById('player1').value
    const inputPlayer2 = document.getElementById('player2').value
    if(!inputPlayer1 || !inputPlayer2) {
        return false
    }
    return true
}

function toggleButtonDisable() {
    const inputValid = isInputValid()
    startButton.disabled = !inputValid  
}

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
    readyAudio1.pause()
    bombHasBeenPlantedAudio.play()
    gameBoard.classList.remove('finished')
    startButton.disabled = true
    vBoard = [['', '', ''],['', '', ''],['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    boardRegions.forEach((element) => {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions() {
    const winRegions = []
    
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function disableRegion(element) {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions) {
    regions.forEach((region) => {
        document.querySelector(`[data-region="${region}"]`).classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer)
    if (playerName.id == 'player1'){
        trWinAudio.play()
    } else {
        ctWinAudio.play()
    }
    document.querySelector('h2').innerHTML = `<span id="turnPlayer">${playerName.value}</span> venceu`
    const gameBoard = document.getElementById('gameBoard')
    gameBoard.classList.add('finished')
    startButton.disabled = false
    readyAudio1.play()
}

function handleBoardClick(ev) {
    if (gameBoard.classList.contains('finished')) {
        return false
    }
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]

    if (turnPlayer === 'player1') {
        span.innerHTML = '<img class="span-image" src="../../../../images/trTicTacToe.png">' 
        vBoard[row][column] = 'X'
    } else {
        span.innerHTML = '<img class="span-image" src="../../../../images/ctTicTacToe.png">' 
        vBoard[row][column] = 'O'
    }

    console.clear()
    console.table(vBoard)
    disableRegion(span)

    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
        updateTitle();
    } else {
        document.querySelector('h2').innerHTML = 'Empate'
        gameBoard.classList.add('finished')
        readyAudio1.play()
        startButton.disabled = false

    }
}

document.getElementById('start').addEventListener('click', initializeGame)