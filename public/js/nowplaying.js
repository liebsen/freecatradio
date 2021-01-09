let currentSong = null
let currentListeners = null

nowPlaying = () => {
  const nowplaying = document.querySelector('.nowplaying')
  const headphones = '<span class="mdi mdi-headphones"></span> '
  const microphone = '<span class="mdi mdi-microphone-variant"></span> '
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    let sources = res.data.icestats.source
    let currentTitle = ''
    let icon = headphones
    let listeners = 0
    if (sources.title) {
      currentTitle = sources.title
      listeners = sources.listeners
    } else {
      if (sources[1] && sources[1].title) {
        icon = microphone
        currentTitle = sources[1].title
        listeners = sources[1].listeners
      } else {
        currentTitle = sources[0].title
        listeners = sources[0].listeners
      }
    }
    if (listeners !== currentListeners) {
      console.log('👂', listeners)
      currentListeners = listeners
    }
    if (currentSong !== currentTitle) {
      nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
      nowplaying.classList.add('fadeOutUp')
      currentSong = currentTitle
      setTimeout(() => {
        nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
        nowplaying.innerHTML = icon + decodeURIComponent(currentTitle)
        nowplaying.classList.add('fadeInUp')
      }, 1000)
    }
  })  
}

setInterval(() => nowPlaying(), 10000)
nowPlaying()