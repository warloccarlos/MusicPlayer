
let audioCtx, analyser, source, dataArray, bufferLength;
const audio = document.getElementById("audio");
const canvas = document.getElementById("visualizer");
const canvasCtx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = 200;

// Initialize Audio Visualizer
      function initializeAudioVisualizer() {
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        drawVisualizer();
      }

      // Draw visualizer on canvas
      function drawVisualizer() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        requestAnimationFrame(drawVisualizer);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
    }

      // Start visualizer when audio plays
      audio.onplay = function() {
        if (!audioCtx) {
          initializeAudioVisualizer();
        }
      };