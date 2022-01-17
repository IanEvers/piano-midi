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
      notaMasBaja: 36,
    }
  },
  mutations: {
    togglePianoControllersDisplay (state) {
      state.pianoControllersDisplay = !state.pianoControllersDisplay
    }
  }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')