nowPlaying = () => {
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    document.querySelector('.nowplaying').innerHTML = decodeURIComponent(escape(res.data.icestats.source.title))
  })  
}
setInterval(() => {
  nowPlaying()
}, 10000)
nowPlaying()
