<template>
  <div class="canvasContenedor">
      <canvas width="500" height="500" id="canvas"></canvas>
      <button @click="play($event.target)"> <i class="fas fa-play fa-4x"></i> </button> 
  </div>
</template>

<script>

export default {
  name: 'Canvas',
  methods: {
    play(boton) {
      boton.style.display = "none";

      let regularWorker = new Worker("/workers/canvasWorker.js");

      window.addEventListener('keydown', function(e) {
        regularWorker.postMessage({
          "play": e.keyCode
        });
      });

      window.addEventListener('keyup', function(e) {
        regularWorker.postMessage({
          "stop": e.keyCode
        });
      });
    
      regularWorker.onmessage = function(e) {
        var audio = new Audio(e.data.audio);
        audio.play();
      };
    }
  },
}

</script>

<style scoped>

.canvasContenedor {
  position: relative;
  display: flex;
}

canvas {
  border: 1px solid black;
}

canvas:fullscreen {
  background-color: #f3ffff;
}
canvas:-webkit-full-screen {
  background-color: #f3ffff ;
}
canvas:-moz-full-screen {
  background-color: #f3ffff;
}

button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  background: none;
  border: none;
  color: #00a6d870;
  padding: 0;
}

</style>