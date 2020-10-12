let currentSong = null

nowPlaying = () => {
  const nowplaying = document.querySelector('.nowplaying')
  const headphones = '<span class="mdi mdi-headphones"></span> '
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    let title = res.data.icestats.source.title
    if (currentSong !== title) {
      nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
      nowplaying.classList.add('fadeOutUp')
      currentSong = title
      setTimeout(() => {
        nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
        nowplaying.innerHTML = headphones + decodeURIComponent(title)
        nowplaying.classList.add('fadeInUp')
      }, 1000)
    }
  })  
}

setInterval(() => nowPlaying(), 10000)
nowPlaying()