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
    playBtn.classList.add('mdi-pause-circle')
    document.getElementById("canvas").style.display = 'block'
    audio.play()
    visualize(0, audio)  
  } else {
    audio.pause()
    audio.currentTime = 0
    playBtn.classList.remove('mdi-pause-circle')
    playBtn.classList.add('mdi-play-circle')
    document.getElementById("canvas").style.display = 'none'
  }
}

playBtn.onclick = () => {
  togglePlay()
}
