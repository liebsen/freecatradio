document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading')) {
    document.getElementById('loading').classList.add('animated', 'fadeOut')
    setTimeout(() => {
      document.getElementById('loading').remove()  
    }, 500)
  }
})

togglePlay = btn => {
  var audio = document.getElementById('stream')
  if (btn.classList.contains('mdi-motion-play')) {
    btn.classList.remove('mdi-motion-play')
    btn.classList.add('mdi-motion-pause')
    document.getElementById("canvas").style.display = 'block'
    audio.play()
    visualize(0, audio)  
  } else {
    audio.pause()
    btn.classList.remove('mdi-motion-pause')
    btn.classList.add('mdi-motion-play')
    document.getElementById("canvas").style.display = 'none'
  }
}