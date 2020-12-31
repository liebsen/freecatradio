let currentSong = null

nowPlaying = () => {
  const nowplaying = document.querySelector('.nowplaying')
  const headphones = '<span class="mdi mdi-headphones"></span> '
  const microphone = '<span class="mdi mdi-microphone-variant"></span> '
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    let sources = res.data.icestats.source
    let currentTitle = ''
    let icon = headphones
    console.log(sources)
    if (Object.keys(sources).length === 1) {
      currentTitle = sources.title
    } else {
      if (sources[1] && sources[1].title) {
        icon = microphone
        currentTitle = sources[1].title
      } else {
        currentTitle = sources[0].title
      }
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