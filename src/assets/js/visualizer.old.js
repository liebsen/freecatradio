// var modes = ['bar-graph', 'waveform', 'rgb-bar-graph']
var modes = ['waves2', 'bar-graph', 'waveform']
var mode = modes[0]
var context = null
var src = null

function at(e, t) {
    for (e.moveTo(t[0], t[1]), Ce = 2; Ce < t.length - 1; Ce += 2) e.lineTo(t[Ce], t[Ce + 1])
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

function visualize(from, source) {
  if (!context) {
    context = new AudioContext();

    if (0 == from) {
      src = context.createMediaElementSource(source);
    } else if (1 == from) {
      src = context.createMediaStreamSource(source);
    } else if (2 == from) {
      src = context.createMediaStreamSource(source);
    }
  }

  var analyser = context.createAnalyser();
  var listen = context.createGain();
  var canvas = document.getElementById("canvas");
  var WIDTH = (canvas.width = window.innerWidth);
  var HEIGHT = (canvas.height = window.innerHeight);
  var p = canvas.getContext("2d");

  /* var mouseX = 0;
  var mouseY = 0;
  canvas.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });*/

  src.connect(listen);
  listen.connect(analyser);
  if (from == 0) {
    analyser.connect(context.destination);
  }
  analyser.fftSize = 2**13;
  var frequencyBins = analyser.fftSize / 2;

  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  var dataHistory = [];

  renderFrame();

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    
    analyser.smoothingTimeConstant = 0.9;

    if (from == 2) {
      if (cbx.checked) {
        listen.gain.setValueAtTime(1, context.currentTime);
      } else {
        listen.gain.setValueAtTime(0, context.currentTime);
      }
    } else {
      listen.gain.setValueAtTime(1, context.currentTime);
    }

    var WIDTH = (canvas.width = window.innerWidth);
    var HEIGHT = (canvas.height = window.innerHeight);
    var sliceWidth = WIDTH * 1.0 / bufferLength;

    var x = 0;
    var scale = Math.log(frequencyBins - 1) / WIDTH;

    // p.fillStyle = "transparent";
    // p.fillRect(0, 0, WIDTH, HEIGHT);

    /*
     p.lineWidth = 1;
    p.strokeStyle = "#fff";
    p.beginPath();
    p.moveTo(mouseX, 0);
    p.lineTo(mouseX, HEIGHT);
    p.stroke();
    p.closePath();

    p.textBaseline = "bottom";
    p.textAlign = "left";
    p.font = "16px Courier";
    p.fillStyle = "white";
    p.fillText(
      Math.floor(Math.E ** (mouseX / WIDTH * Math.log(frequencyBins / 2))) +
        " Hz",
      mouseX,
      mouseY
    );*/ 

    if (mode == "bar-graph") {
      analyser.getByteFrequencyData(dataArray);
      for (var i = 0; i < bufferLength; i++) {
        let x = Math.floor(Math.log(i) / scale);
        barHeight = dataArray[i];
        /* var r = barHeight + (25 * (i/bufferLength));
                 var g = 250 * (i/bufferLength);
                 var b = 50; */
        var h = 300 - barHeight * 300 / 255;
        var s = 100 + "%";
        var l = barHeight < 64 ? barHeight * 50 / 64 + "%" : "50%";
        p.fillStyle = "hsl(" + h + "," + s + "," + l + ")";
        // p.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        p.fillRect(
          x,
          HEIGHT - barHeight * HEIGHT / 255,
          Math.floor(Math.log(i + 1) / scale) - Math.floor(Math.log(i) / scale),
          HEIGHT
        );
      }
    } else if (mode == "waveform") {
      analyser.getByteFrequencyData(dataArray);
      let start = 0//dataArray.find(a=> Math.max.apply('',dataArray));
      analyser.getByteTimeDomainData(dataArray);
      p.lineWidth = 1;
      p.strokeStyle = "#fff";
      p.beginPath();
      x = 0;
      for (var i = start; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;

        if (i === 0) {
          p.moveTo(x, y);
        } else {
          p.lineTo(x, y);
        }

        x = i*sliceWidth//frequencyBins/analyser.sampleRate;
      }
      p.lineTo(WIDTH, dataArray[0] / 128.0 * HEIGHT / 2);
      p.stroke();
    } else if (mode == "rgb-bar-graph") {
      //p.globalCompositeOperation = "hue";
      analyser.getByteFrequencyData(dataArray);
      var imgData = p.createImageData(WIDTH, HEIGHT);
      // for (var i = 0; i < bufferLength; i += 2) {
      //   let x = i / 3 *  WIDTH / bufferLength;
      //   var r = dataArray[i];
      //   var g = dataArray[i + 1];
      //   var b = dataArray[i + 2];
      for (j = 0; j < imgData.data.length; j += 4) {
        let y = j / 4 / WIDTH;
        let x = Math.floor(((j / 4) % WIDTH) * bufferLength / WIDTH);
        imgData.data[j + 0] =
          255 - dataArray[x] <= y * (255 / HEIGHT) ? dataArray[x] : 0;
        imgData.data[j + 1] =
          255 - dataArray[x + 1] <= y * (255 / HEIGHT) ? dataArray[x + 1] : 0;
        imgData.data[j + 2] =
          255 - dataArray[x + 2] <= y * (255 / HEIGHT) ? dataArray[x + 2] : 0;
        imgData.data[j + 3] = 255;
      }
      p.putImageData(imgData, 0, 0);
      // p.fillStyle = "rgb(" + r + "," + 0 + "," + 0 + ")";
      // p.fillRect(x, HEIGHT - (r * HEIGHT / 255), 1, HEIGHT);
      // p.fillStyle = "rgb(" + 0 + "," + g + "," + 0 + ")";
      // p.fillRect(x, HEIGHT - (g * HEIGHT / 255), 1, HEIGHT);
      // p.fillStyle = "rgb(" + 0 + "," + 0 + "," + b + ")";
      // p.fillRect(x, HEIGHT - (b * HEIGHT / 255), 1, HEIGHT);
      // }
    } else if (mode == "waves1") {
      analyser.getByteFrequencyData(dataArray);
      p.clearRect(0, 0, WIDTH, HEIGHT)
      p.lineWidth = 2
      p.miterLimit = 1
      p.beginPath()
      p.moveTo(0, HEIGHT)
      for (var e = 0; e < dataArray.length / 2; e += 1) {
        p.lineTo(e * WIDTH / dataArray.length * 2, HEIGHT - dataArray[e] * HEIGHT / 255 + 2);
      }
      p.strokeStyle = "rgba(245,159,126,0.5)"
      p.stroke()
      p.closePath()
    } else if (mode == "waves5") {
      p.clearRect(0, 0, WIDTH, HEIGHT), p.lineWidth = 3, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(245,159,126, 0.2)";
      var e = [];
      var re = WIDTH
      p.beginPath(), p.moveTo(0, HEIGHT);
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(dataArray.length / 8 * t / re);
          e.push(t), e.push(HEIGHT - dataArray[i] * HEIGHT / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(245,159,126, 0.3)", p.beginPath(), p.moveTo(0, HEIGHT), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(dataArray.length / 8 * t / re);
          e.push(t), e.push(HEIGHT - dataArray[i + i] * HEIGHT / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(245,159,126, 0.4)", p.beginPath(), p.moveTo(0, HEIGHT), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(dataArray.length / 8 * t / re);
          e.push(t), e.push(HEIGHT - dataArray[i + i + i] * HEIGHT / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath(), p.lineWidth = 2, p.lineCap = "round", p.miterLimit = 1, p.strokeStyle = "rgba(245,159,126, 0.5)", p.beginPath(), p.moveTo(0, HEIGHT), e = [];
      for (var t = 0; t < re + 20; t += 20) {
          var i = Math.round(dataArray.length / 8 * t / re);
          e.push(t), e.push(HEIGHT - dataArray[i + i + i + i] * HEIGHT / 255 + 2)
      }
      it(p, e, .5), p.stroke(), p.closePath()
    } else if (mode == "waves") {
      p.clearRect(0, 0, WIDTH, HEIGHT)
      p.lineWidth = 1
      p.miterLimit = 1
      p.lineCap = "round"
      p.beginPath()
      p.moveTo(0, HEIGHT)
      for (var e = 0; e < dataArray.length / 2; e += 1) {
        p.lineTo(e * WIDTH / dataArray.length * 2, HEIGHT - dataArray[e] * HEIGHT / 255 + 2);
      }
      p.lineTo(WIDTH, HEIGHT)
      p.lineTo(0, HEIGHT)
      p.fillStyle = "rgba(245,159,126,0.5)"
      p.fill()
      p.closePath()
    } else if (mode == "waves2") {
      analyser.getByteFrequencyData(dataArray);
      p.clearRect(0, 0, WIDTH, HEIGHT)
      p.lineWidth = 1
      p.miterLimit = 1
      p.beginPath()
      p.moveTo(0, HEIGHT)
      for (var e = 0; e < dataArray.length / 2; e += 1) {
        p.lineTo(e * WIDTH / dataArray.length * 2, HEIGHT - dataArray[e] * HEIGHT / 255 + 2)
      }
      p.lineTo(WIDTH, HEIGHT)
      p.lineTo(0, HEIGHT)
      p.fillStyle = "rgba(245,159,126,0.5)"
      p.fill()
      p.closePath()
    } else {
      if (typeof(a)) {
        a = setInterval(function () {
        analyser.getByteFrequencyData(dataArray);
        dataHistory.unshift(dataArray);
        });
      }
      for (let j = 0; j < dataHistory.length; j++) {
        for (var i = 0; i < bufferLength; i++) {
          let x = Math.floor(Math.log(i) / scale);
          barHeight = dataHistory[j][i];
          /* var r = barHeight + (25 * (i/bufferLength));
                 var g = 250 * (i/bufferLength);
                 var b = 50; */
          var h = 300 - barHeight * 300 / 255;
          var s = 100 + "%";
          var l = barHeight < 64 ? barHeight * 50 / 64 + "%" : "50%";
          p.fillStyle = "hsl(" + h + "," + s + "," + l + ")";
          // p.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          p.fillRect(
            x,
            HEIGHT * j / dataHistory.length,
            Math.floor(Math.log(i + 1) / scale) -
              Math.floor(Math.log(i) / scale),
            HEIGHT * j +
              1 / dataHistory.length -
              HEIGHT * j / dataHistory.length
          );
        }
      }
      if (dataHistory.length > 5) {
        dataHistory.pop();
      }
    }
  }
}
