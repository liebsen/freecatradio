let audio = document.getElementById("stream")
let playBtn = document.getElementById("playBtn")

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading')) {
    document.getElementById('loading').classList.add('animated', 'fadeOut')
    setTimeout(() => {
      document.getElementById('loading').remove()  
    }, 500)
  }
})

togglePlay = () => {
  if (playBtn.classList.contains('mdi-play-circle')) {
    playBtn.classList.remove('mdi-play-circle')
    playBtn.classList.add('mdi-stop-circle')
    document.getElementById("canvas").style.display = 'block'
    audio.play()
    visualize(0, audio)  
  } else {
    audio.pause()
    audio.currentTime = 0
    playBtn.classList.remove('mdi-stop-circle')
    playBtn.classList.add('mdi-play-circle')
    document.getElementById("canvas").style.display = 'none'
  }
}

playBtn.onclick = () => {
  togglePlay()
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
  const err = `[freecatradio] error: ${msg}${url}:${lineNo} -- ${error}`
  let ep = 'https://overlemon.com/debug'
  if (['192.168.2.13:3000', 'localhost:3000'].includes(location.host)) {  
    ep = 'https://192.168.2.13:3000/debug'
  }
  axios.post(ep, { err: err })
}