function logOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = '../../index.html';
    }).catch(() => {
        alert('Erro ao fazer logout')
    })
  }


function confirmLogout() {
    const logoutModal = document.querySelector('.logout-modal')  
    // const slider = document.querySelector('.container-slider')
    const undoButton = document.querySelector('.undo-button')

    logoutModal.showModal()
    // slider.style.display = 'none'

    undoButton.addEventListener('click', () => {
        // slider.style.display = 'flex'
        logoutModal.close()
    })
}

//teste de commit