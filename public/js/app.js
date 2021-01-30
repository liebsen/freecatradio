let audio = document.getElementById("stream")
let playBtn = document.getElementById("playBtn")
let switchControls = document.getElementById("switchControls")
let switchColor = document.getElementById("switchColor")
let switchVisualiser = document.getElementById("switchVisualiser")

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading')) {
    document.getElementById('loading').classList.add('animated', 'fadeOut')
    setTimeout(() => {
      document.getElementById('loading').remove()  
    }, 500)
  }
})

togglePlay = () => {
  document.getElementById("switchControls").classList.remove('fadeOut', 'fadeIn')
  if (!playBtn.classList.contains('is-playing')) {
    playBtn.classList.add('is-playing')
    document.getElementById("canvas").classList.add('active')
    document.getElementById("overlay").classList.add('active')
    document.getElementById("switchControls").classList.add('active')
    audio.play()
    visualize(audio)  
  } else {
    audio.pause()
    audio.currentTime = 0
    playBtn.classList.remove('is-playing')
    document.getElementById("canvas").classList.remove('active')
    document.getElementById("overlay").classList.remove('active')
    document.getElementById("switchControls").classList.remove('active')
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

let nextColor = () => {
  let index = colors.findIndex(e => e === color.replace('#', ''))
  index++
  if (index >= colors.length) {
    index = 0
  }
  color = `#${colors[index]}`
  document.getElementById('overlay').style.backgroundColor = `${color}33`
  console.log(color)
}

switchVisualiser.onclick = () => {
  nextVisualizer()
}

switchColor.onclick = () => {
  console.log('n')
  nextColor()
}

playBtn.onclick = () => {
  togglePlay()
}

/*
window.onerror = function (msg, url, lineNo, columnNo, error) {
  const err = `[freecatradio] error: ${msg}${url}:${lineNo} -- ${error}`
  let ep = 'https://overlemon.com/debug'
  if (['192.168.2.13:3000', 'localhost:3000'].includes(location.host)) {  
    ep = 'https://192.168.2.13:3000/debug'
  }
  axios.post(ep, { err: err })
}*/