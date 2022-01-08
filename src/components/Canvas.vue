<template>
  <div class="canvasContenedor">
      <canvas width="500" height="500"  class="canvas" id="canvas"></canvas>
      <canvas width="500" height="500"  class="canvas canvasFondo" id="canvasFondo"></canvas>
      <button v-if="!playing" @click="play()"> <i class="fas fa-play fa-4x"></i> </button> 
      <button v-else @click="pause()"> <i class="fas fa-pause fa-4x"></i> </button> 
  </div>
</template>

<script>

import { Piano } from '@tonejs/piano';
import WebMidi from 'webmidi';

export default {
  name: 'Canvas',
  data() {
    return {
      midiDevice: null,
      regularWorker: new Worker("/workers/canvasWorker.js"),
      started: false,
      playing: false,
    }
  },
  mounted() {
    this.initializePianoSamples();
    
    WebMidi.enable(() => {
      this.availableInputs = WebMidi.inputs.map((input) => input.name);
      this.midiDevice = WebMidi.getInputByName(this.availableInputs[0]); //eslint-disable-line
    });

    this.redimensionar();
  },
  methods: {
    start() {
      // envío la lógica de los canvas al worker
      var canvas = document.getElementById('canvas')
      var offscreen = canvas.transferControlToOffscreen();
      this.regularWorker.postMessage({canvas: offscreen}, [offscreen]);
     
      var canvasFondo = document.getElementById('canvasFondo')
      var offscreenFondo = canvasFondo.transferControlToOffscreen();
      this.regularWorker.postMessage({canvasFondo: offscreenFondo}, [offscreenFondo]);
      
      if(this.midiDevice) {
        this.midiDevice.addListener('noteon', 'all', (e) => {
          const { note } = e;
          this.noteOn(note);
        });

        this.midiDevice.addListener('noteoff', 'all', (e) => {
          const { note } = e;
          this.noteOff(note);
        });
      }
      this.started = true
    },

    play() {
      if(!this.started) {
        this.start()
      }

      this.regularWorker.postMessage({
        "opciones": 
          {
            playing: true
          }
      
      });

      this.playing = true;
    },
    pause() {
      this.regularWorker.postMessage({
        "opciones": { playing: false }
      });

      this.playing = false;
    },

    initializePianoSamples() {
      this.piano = new Piano({ velocities: 2 });
      this.piano.toDestination();
      this.piano.output.gain.value = 0.5;
      this.piano.load().then(() => {
        console.log('loaded!');
      });
    },

    noteOn(note) {
      this.piano.keyDown({ midi: note.number });

      this.regularWorker.postMessage({
        "presionado": 1,
        "nota": note.number
      });
    },

    noteOff(note) {
      this.piano.keyUp({ midi: note.number });

      this.regularWorker.postMessage({
        "presionado": 0,
        "nota": note.number
      });
    },

    redimensionar() {
      var canvases = document.getElementsByClassName('canvas')
      console.log('dinesion!')
      Array.from(canvases).forEach(function(canvas) {
        canvas.width  = window.innerWidth / 2.5
        canvas.height =  canvas.width 
      });
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

.canvasFondo {
  position: absolute;
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