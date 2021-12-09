<template>
  <div class="canvasContenedor">
      <canvas width="500" height="500" id="canvas"></canvas>
      <button @click="play($event.target)"> <i class="fas fa-play fa-4x"></i> </button> 
  </div>
</template>

<script>

import { Piano } from '@tonejs/piano';
import WebMidi from 'webmidi';

export default {
  name: 'Canvas',
  data() {
    return {
      midiDevice: null
    }
  },
  mounted() {
    this.initializePianoSamples();
     WebMidi.enable(() => {
      this.availableInputs = WebMidi.inputs.map((input) => input.name);
      this.midiDevice = WebMidi.getInputByName(this.availableInputs[0]); //eslint-disable-line
    });
  },
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

      this.midiDevice.addListener('noteon', 'all', (e) => {
        const { note } = e;
        this.noteOn(note);
      });
      this.midiDevice.addListener('noteoff', 'all', (e) => {
        const { note } = e;
        this.noteOff(note);
      });

      regularWorker.onmessage = function(e) {
        var audio = new Audio(e.data.audio);
        audio.play();
      };
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
      // console.log('Note ON: ', note);
      this.piano.keyDown({ midi: note.number });
    },

    noteOff(note) {
      // console.log('Note OFF: ', note);
      this.piano.keyUp({ midi: note.number });
    },
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