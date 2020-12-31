let currentSong = null

nowPlaying = () => {
  const nowplaying = document.querySelector('.nowplaying')
  const headphones = '<span class="mdi mdi-headphones"></span> '
  const microphone = '<span class="mdi mdi-microphone-variant"></span> '
  let icon = ''
  let currentTitle = ''
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    let sources = res.data.icestats.source
    if (sources[1] && sources[1].title) {
      icon = microphone
      currentTitle = sources[1].title
    } else {
      icon = headphones
      currentTitle = sources[0].title
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