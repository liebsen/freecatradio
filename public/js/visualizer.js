var modes = ['waves1', 'waves2', 'waves3', 'waves4', 'waves5', 'waves6']
var colors = ['e11d74', 'f86808', 'cf1b1b', '394989', '2b580c', '21209c', '34a853', '5b5656', '8105d8']
var mode = modes[0]
var color = `#${colors[0]}`
var context = null
var src = null
var canvas = document.getElementById("canvas");
var d = {
  width: (canvas.width = window.innerWidth),
  height: (canvas.height = window.innerHeight)
}

// document.getElementById('overlay').style.backgroundColor = `${color}ee`
function at(e, t) {
  for (e.moveTo(t[0], t[1]), Ce = 2; Ce < t.length - 1; Ce += 2) e.lineTo(t[Ce], t[Ce + 1])
}

function ct(e) {
  var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null
}

function tt(e, t, i, a, o) {
  e.beginPath(), e.arc(t, i, a, 0, 2 * Math.PI), e.closePath(), e.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", " + o + ")", e.fill()
}

function it(e, t, i, a, o, n) {
  if (e.beginPath(), at(e, function(e, t, i, a) {
      t = void 0 !== t ? t : .5, i = i || !1, a = a || 16;
      var o, n, r, s, l, d, c, u, p, h, m, f, g, w = [],
          v = [];
      w = e.slice(0), i ? (w.unshift(e[e.length - 1]), w.unshift(e[e.length - 2]), w.unshift(e[e.length - 1]), w.unshift(e[e.length - 2]), w.push(e[0]), w.push(e[1])) : (w.unshift(e[1]), w.unshift(e[0]), w.push(e[e.length - 2]), w.push(e[e.length - 1]));
      for (g = 2; g < w.length - 4; g += 2)
          for (f = 0; f <= a; f++) r = (w[g + 2] - w[g - 2]) * t, s = (w[g + 4] - w[g]) * t, l = (w[g + 3] - w[g - 1]) * t, d = (w[g + 5] - w[g + 1]) * t, m = f / a, c = 2 * Math.pow(m, 3) - 3 * Math.pow(m, 2) + 1, u = -2 * Math.pow(m, 3) + 3 * Math.pow(m, 2), p = Math.pow(m, 3) - 2 * Math.pow(m, 2) + m, h = Math.pow(m, 3) - Math.pow(m, 2), o = c * w[g] + u * w[g + 2] + p * r + h * s, n = c * w[g + 1] + u * w[g + 3] + p * l + h * d, v.push(o), v.push(n);
      return v
    }(t, i, a, o)), n) {
    e.beginPath();
    for (var r = 0; r < t.length - 1; r += 2) e.rect(t[r] - 2, t[r + 1] - 2, 4, 4)
  }
}

function visualize(source) {
  if (!context) {
    context = new AudioContext();
    src = context.createMediaElementSource(source);
  }

  var analyser = context.createAnalyser()
  var listen = context.createGain()
  var canvas = document.getElementById("canvas")
  var WIDTH = (canvas.width = window.innerWidth)
  var HEIGHT = (canvas.height = window.innerHeight)
  var p = canvas.getContext("2d")
  const re = d.width
  var ge = 0
  var fe = []
  for (Ce = 0; Ce < 512; Ce++) {
    var ke = {};
    ke.x = Math.floor(1920 * Math.random() + 1), ke.y = Math.floor(1080 * Math.random() + 1), ke.radius = Math.floor(1080 * Math.random() / 5 + 2), ke.alpha = 1, ke.speed = Math.floor(50 * Math.random() + 30), fe.push(ke)
  }

  src.connect(listen);
  listen.connect(analyser);
  analyser.connect(context.destination);
  // analyser.fftSize = 2**13;
  analyser.fftSize = 1024;
  var frequencyBins = analyser.fftSize / 2;

  var bufferLength = analyser.frequencyBinCount;
  var me = new Uint8Array(bufferLength);
  var dataHistory = [];

  renderFrame();

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    
    analyser.smoothingTimeConstant = 0.9
    analyser.getByteFrequencyData(me)

    if (mode == "waves1") {
      p.clearRect(0, 0, d.width, d.height), p.lineWidth = 0, p.miterLimit = 1;
      var e = [];
      p.beginPath(), p.moveTo(0, d.height);
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.lineTo(re, d.height), p.lineTo(0, d.height), p.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.1)", p.fill(), p.closePath(), p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.lineTo(re, d.height), p.lineTo(0, d.height), p.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.15)", p.fill(), p.closePath(), p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.lineTo(re, d.height), p.lineTo(0, d.height), p.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.2)", p.fill(), p.closePath(), p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i + i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.lineTo(re, d.height), p.lineTo(0, d.height), p.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.25)", p.fill(), p.closePath()
    } else if (mode == "waves2") {
      p.clearRect(0, 0, d.width, d.height), p.lineWidth = 2, p.miterLimit = 1, p.beginPath(), p.moveTo(0, d.height);
      for (var e = 0; e < me.length / 2; e += 1) p.lineTo(e * d.width / me.length * 2, d.height - me[e] * d.height / 255 + 2);
      p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.5)", p.stroke(), p.closePath()
    } else if (mode == "waves3") {
      p.clearRect(0, 0, d.width, d.height), p.lineWidth = 1, p.miterLimit = 1, p.beginPath();
      for (var e = 0; e < d.width; e += 3) {
          var t = Math.round(me.length / 2 * e / d.width);
          p.moveTo(e, d.height), p.lineTo(e, d.height - me[t] * d.height / 255 + 2), p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.5)"
      }
      p.stroke()
    } else if (mode == "waves4") {
      p.clearRect(0, 0, d.width, d.height), p.lineWidth = 1, p.miterLimit = 1, p.beginPath(), p.moveTo(0, d.height);
      for (var e = 0; e < me.length / 2; e += 1) p.lineTo(e * d.width / me.length * 2, d.height - me[e] * d.height / 255 + 2);
      p.lineTo(d.width, d.height), p.lineTo(0, d.height), p.fillStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.5)", p.fill(), p.closePath()
    } else if (mode == "waves5") {
      p.clearRect(0, 0, d.width, d.height), p.lineWidth = 3, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.2)";
      var e = [];
      p.beginPath(), p.moveTo(0, d.height);
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.3)", p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.4)", p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(" + ct(color).r + ", " + ct(color).g + ", " + ct(color).b + ", 0.5)", p.beginPath(), p.moveTo(0, d.height), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(me.length / 8 * t / re);
          e.push(t), e.push(d.height - me[i + i + i + i] * d.height / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath()
    } else if (mode == "waves6") {
      p.clearRect(0, 0, d.width, d.height), ge++;
      for (var e = 0; e < me.length / 2; e++) tt(p, Math.cos(ge / fe[e].speed) * fe[e].radius + fe[e].x, Math.sin(ge / fe[e].speed) * fe[e].radius + fe[e].y, fe[e].radius * me[e] / 255, (me[e] / 255 / 2 + .5) / 5)
    }
  }
}
