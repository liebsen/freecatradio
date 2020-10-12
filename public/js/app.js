let audio = document.getElementById("stream")
let playBtn = document.getElementById("playBtn")
let nextVsualzr = document.getElementById("nextVsualzr")

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading')) {
    document.getElementById('loading').classList.add('animated', 'fadeOut')
    setTimeout(() => {
      document.getElementById('loading').remove()  
    }, 500)
  }
})

togglePlay = () => {
  if (!playBtn.classList.contains('is-playing')) {
    playBtn.classList.add('is-playing')
    document.getElementById("canvas").classList.remove('fadeOut')
    document.getElementById("nextVsualzr").classList.remove('fadeOut')
    document.getElementById("canvas").classList.add('fadeIn')
    document.getElementById("nextVsualzr").classList.add('fadeIn')
    audio.play()
    visualize(0, audio)  
  } else {
    audio.pause()
    audio.currentTime = 0
    playBtn.classList.remove('is-playing')
    document.getElementById("canvas").classList.remove('fadeIn')
    document.getElementById("nextVsualzr").classList.remove('fadeIn')
    document.getElementById("canvas").classList.remove('fadeOut')
    document.getElementById("nextVsualzr").classList.add('fadeOut')
  }
}

let nextVisualizer = () => {
  let index = modes.findIndex(e => e === mode)
  index++
  if (index >= modes.length) {
    index = 0
  }
  mode = modes[index]
}

nextVsualzr.onclick = () => {
  nextVisualizer()
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