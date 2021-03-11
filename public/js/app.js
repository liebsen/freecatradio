const socket = io('https://api.freecatradio.com')
const audio = document.getElementById("stream")
const playBtn = document.getElementById("playBtn")
const switchControls = document.getElementById("switchControls")
const switchColor = document.getElementById("switchColor")
const switchVisualiser = document.getElementById("switchVisualiser")
const chatForm = document.getElementById("chat_form")
const chatContent = document.getElementById("chat_content")
const userName = document.getElementById("username")
const messageInput = document.getElementById("message")
let initChat = false

document.querySelectorAll(".toggleChat").forEach(e => {
  e.onclick = () => {
    if (!initChat) {
      socket.emit('request_history')
      socket.on('history', data => {
        data.history.forEach(e => {
          addLine(e)
        })
        let username = 'Anonymous'
        if (localStorage.getItem('username')) {
          username = localStorage.getItem('username')
          socket.emit('change_username', username)
        }
        socket.emit('message', { username: 'botcat', country: 'botcat', message : `${username} joined`, created: new Date() })
        userName.innerHTML = username
        initChat = true
        setInterval(updateTimestamps, 1000 * 60)
      })
    }
    document.getElementById('chat').classList.toggle('active')
    document.getElementById('chatControls').classList.toggle('active')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading')) {
    document.getElementById('loading').classList.add('animated', 'fadeOut')
    setTimeout(() => {
      document.getElementById('loading').remove()  
    }, 500)
  }
})

switchVisualiser.onclick = () => {
  nextVisualizer()
}

switchColor.onclick = () => {
  nextColor()
}

playBtn.onclick = () => {
  togglePlay()
}

userName.onclick = () => {
  const current = localStorage.getItem('username') || 'Anonymous'
  var username = prompt('Input your name', current)
  if (username.length > 10) {
    username = username.substring(0,10)
  }
  socket.emit('change_username', username)
  localStorage.setItem('username', username)
  userName.innerHTML = username
}

chatForm.onsubmit = () => {
  const message = messageInput.value
  if (message.trim().length) {
    messageInput.value = ''
    if (message.length > 255) {
      message = message.substr(0, 255) + '...'
    }
    socket.emit('message', { message : message })
  }
  return false
}

messageInput.onkeyup = () => {
  if (messageInput.value) {
    socket.emit('typing')
  }
}

socket.on('message', data => {
  addLine(data)
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

nextVisualizer = () => {
  let index = modes.findIndex(e => e === mode)
  index++
  if (index >= modes.length) {
    index = 0
  }
  mode = modes[index]
}

nextColor = () => {
  let index = colors.findIndex(e => e === color.replace('#', ''))
  index++
  if (index >= colors.length) {
    index = 0
  }
  color = `#${colors[index]}`
}


scrollToBottom = () => {
  setTimeout(() => {
    const box = document.getElementById('chat_content')
    if (box) {
      box.scrollTop = box.scrollHeight
    }
  }, 50)
}

addLine = data => {
  const time = moment(data.created).fromNow()
  chatContent.innerHTML+= `<p class="message"><span class="flag" style="background-image:url('/flags/${data.country}.svg')"></span><span class="username ${data.username}">${data.username}</span> ${data.message} <span class="time" value="${data.created}">${time}</span></p>`
  scrollToBottom()
}

updateTimestamps = () => {
  document.querySelectorAll('.time').forEach(e => {
    e.textContent = moment(e.getAttribute('value')).fromNow()
  })
}

moment.locale('es')

/*
window.onerror = function (msg, url, lineNo, columnNo, error) {
  const err = `[freecatradio] error: ${msg}${url}:${lineNo} -- ${error}`
  let ep = 'https://overlemon.com/debug'
  if (['192.168.2.13:3000', 'localhost:3000'].includes(location.host)) {  
    ep = 'https://192.168.2.13:3000/debug'
  }
  axios.post(ep, { err: err })
}*/