const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

// const startButton = document.getElementById('startButton');

// startButton.addEventListener('click', (eve) => {
//     window.location.href = 'game.html';
// })

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setUserSettingsRick()
  }
})

function setUserSettingsRick() {
  const user = firebase.auth().currentUser;
  const connectedUserSettingsDivRick = document.querySelector('.connected-user-settings-div');

  if (user !== null) {
    user.providerData.forEach((profile) => {
      const userEmail = profile.email;
      connectedUserSettingsDivRick.style.display = 'flex'
      connectedUserSettingsDivRick.innerHTML = `
      <span class="connected-span">Conectado, <span class="connected-user">${userEmail}</span></span>
      <a onclick="confirmLogout()"><img class="logout-button icon" src="../../../images/logout.svg" /></a>`
    });
  }
  
}

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  console.log('checking');
  if (disabledCards.length == 20) {
    console.log('checked');
    clearInterval(this.loop)
    alert(`Parabéns! Seu tempo foi: ${timer.innerHTML} segundos`)
    // localStorage.setItem('score', timer.innerHTML);
  } 
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if(firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500)
  }
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }
  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode
    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('./images/${character}.png')`

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard)
  card.setAttribute ('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters ];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {

    const card = createCard(character);
    grid.appendChild(card);
  })
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML =  currentTime + 1;
  },1000)
}

// const routeRanking = (event) => {
//   event.preventDefault();
//   window.location.href = '../../pages/ranking/ranking.html';
// }

// const resetGame = (event) => {
//   event.preventDefault();
//   window.location.reload();
// }

// buttonReset.addEventListener('click', resetGame);
// buttonRanking.addEventListener('click', routeRanking);

window.onload = () => {
  startTimer();
  loadGame();
}

