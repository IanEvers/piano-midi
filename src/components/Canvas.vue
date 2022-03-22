<template>
  <div class="canvasContenedor">
      <canvas width="500" height="500"  class="canvas" id="canvas"></canvas>
      <canvas width="500" height="500"  class="canvas canvasFondo" id="canvasFondo"></canvas>
      <button v-if="!playing" @click="play()"> <i class="fas fa-play fa-4x"></i> </button> 
      <button v-else @click="pause()" class="botonPausa"> <i class="fas fa-pause fa-4x "></i> </button> 
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
      started: false,
      playing: false,
    }
  },
  computed: {
    regularWorker () {
      return this.$store.state.regularWorker
    },
    pianoControllersDisplay() {
      return this.$store.state.pianoControllersDisplay
    },
    notaMasBaja() {
      return this.$store.state.notaMasBaja
    },
  },
  mounted() {
    this.initializePianoSamples();
    
    WebMidi.enable(() => {
      this.availableInputs = WebMidi.inputs.map((input) => input.name);
      this.midiDevice = WebMidi.getInputByName(this.availableInputs[0]); //eslint-disable-line
    });

    this.tamañoCanvas();
  },

  created() {
    window.addEventListener("resize", this.tamañoCanvas);
  },

  unmounted() {
    window.removeEventListener("resize", this.tamañoCanvas);
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
          
          if(note.number == this.notaMasBaja) {
            this.$store.commit('togglePianoControllersDisplay')
            return
          }

          //si la nota es menor a la más baja + 10 y , lo mandamos al handler de opciones
          if(note.number < this.notaMasBaja + 10 && this.pianoControllersDisplay == true) {
            this.opcionesHandler(note.number)
            return
          }

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
        "playingStatus": {
          "playing": true
        }
      });

      this.playing = true;
    },

    pause() {
      this.regularWorker.postMessage({
        "playingStatus": {
          "playing": false
        }
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

    tamañoCanvas() {
      var canvases = document.getElementsByClassName('canvas')

      Array.from(canvases).forEach(function(canvas) {
        canvas.height = window.innerHeight * 0.85
        canvas.width  = canvas.height
      });
    },

    opcionesHandler(nota) {
      switch (nota) {
        case this.notaMasBaja + 2:
          this.$store.commit('colorAnterior')
          break;
        case this.notaMasBaja + 3:
          this.$store.commit('colorSiguiente')
          break;
        case this.notaMasBaja + 4:
          console.log('orien')
          this.$store.commit('toggleOrientacion')
          break;
        case this.notaMasBaja + 5:
          this.$store.commit('menosVelocidad')
          break;
        case this.notaMasBaja + 6:
          this.$store.commit('masVelocidad')
          break;
        case this.notaMasBaja + 7:
          this.$store.commit('menosGrosorDeLinea')
          break;
        case this.notaMasBaja + 8:
          this.$store.commit('masGrosorDeLinea')
          break;
        case this.notaMasBaja + 9:
          this.$store.commit('toggleHoldearNotas')
          break;
        default:
          console.log('Ninguna instrucción encontrada.');
      }
    },
  }
}

</script>

<style scoped>

.canvasContenedor {
  position: relative;
  align-self: flex-start;
  display: flex;
}

.botonPausa {
  color:transparent;
}

.canvasContenedor:hover > .botonPausa {
  color: #00a6d870; 
}

canvas {
  border: 1px solid black;
}

.canvasFondo {
  position: absolute;
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