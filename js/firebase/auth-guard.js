firebase.auth().onAuthStateChanged(user => {
    if (!user && window.location !== 'http://127.0.0.1:5500/index.html') {
      
      window.location.href === '../../index.html'
       unconnectedUserSettings()
     }  else {
      unconnectedUserSettings()
     }
  })

  function unconnectedUserSettings() {
    const unconnectedUserSettingsDiv = document.querySelector('.header-buttons');
    unconnectedUserSettingsDiv.style.display = 'flex'
  }
  