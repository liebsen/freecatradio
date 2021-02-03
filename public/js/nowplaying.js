let currentSong = null
let currentListeners = null

let _utf8_encode = function(e) {
  e = e.replace(/\r\n/g, "\n");
  for (var t = "", i = 0; i < e.length; i++) {
      var a = e.charCodeAt(i);
      a < 128 ? t += String.fromCharCode(a) : a > 127 && a < 2048 ? (t += String.fromCharCode(a >> 6 | 192), t += String.fromCharCode(63 & a | 128)) : (t += String.fromCharCode(a >> 12 | 224), t += String.fromCharCode(a >> 6 & 63 | 128), t += String.fromCharCode(63 & a | 128))
  }
  return t
}
let _utf8_decode = function(e) {
  for (var t = "", i = 0, a = 0, o = 0, n = 0; i < e.length;)(n = e.charCodeAt(i)) < 128 ? (t += String.fromCharCode(n), i++) : n > 191 && n < 224 ? (a = e.charCodeAt(i + 1), t += String.fromCharCode((31 & n) << 6 | 63 & a), i += 2) : (a = e.charCodeAt(i + 1), o = e.charCodeAt(i + 2), t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | 63 & o), i += 3);
  return t
}

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
      socket.emit('message', { username: 'botcat', country: 'botcat', message : `Now listening ${listeners}` })
      currentListeners = listeners
    }
    if (currentSong !== currentTitle) {
      nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
      nowplaying.classList.add('fadeOutUp')
      currentSong = currentTitle
      setTimeout(() => {
        nowplaying.classList.remove('fadeInUp', 'fadeOutUp')
        nowplaying.innerHTML = icon + _utf8_decode(currentTitle)
        nowplaying.classList.add('fadeInUp')
      }, 1000)
    }
  })  
}

setInterval(() => nowPlaying(), 10000)
nowPlaying()