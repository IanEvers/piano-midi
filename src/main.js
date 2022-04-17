import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      regularWorker: new Worker("./workers/canvasWorker.js"),
      pianoControllersDisplay: true,

      opciones: {
        orientacion: 'Vertical',
        velocidad: 60,
        notaMasBaja: 36,
        notaMasAlta: 84,
        grosorLinea: 10,
        holdearNotas: false,
        color: 'red'
      },

      


    }
  },
  mutations: {
    togglePianoControllersDisplay (state) {
      state.pianoControllersDisplay = !state.pianoControllersDisplay
    },
    toggleOrientacion () {
      console.log('orieenenen')
    },
    toggleHoldearNotas(state) {
      state.opciones.holdearNotas = !state.opciones.holdearNotas
    },
    colorAnterior() {
      console.log('colorAnterior')

    },
    colorSiguiente() {

    },
    menosVelocidad() {

    },
    masVelocidad() {

    },
    menosGrosorDeLinea() {

    },
    masGrosorDeLinea() {

    }
  },

})

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')