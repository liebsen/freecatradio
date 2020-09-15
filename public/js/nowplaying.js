nowPlaying = () => {
  axios.get('https://icecast.freecatradio.com/status-json.xsl').then(res => {
    document.querySelector('.nowplaying').innerHTML = res.data.icestats.source.title
  })  
}
setInterval(() => {
  nowPlaying()
}, 30000)
nowPlaying()
