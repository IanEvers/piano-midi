<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div class="titulo">
    <h1 class="titulo">BROKER</h1>
  </div>

  <div class="contenedor">
    <PanelColores/>
    <Canvas/>
    <PanelOpciones/>
  </div>

</template>

<script>

import PanelColores from './components/PanelColores.vue'
import Canvas from './components/Canvas.vue'
import PanelOpciones from './components/PanelOpciones.vue'


export default {
  name: 'App',
  components: {
    PanelColores,
    Canvas,
    PanelOpciones
  },
  data() {
    return {}
    
  },
  mounted() {
    
  },
  methods: {
    colorRandom() {
      return '#' + Math.floor(Math.random()*16777215).toString(16)
    }
  }
}

</script>

<style>
h1, body {
  margin: 0px;
  background-color: #dfebeb;
}

.titulo {
  padding: 1rem;
  display: flex;
  justify-content: center;
}

h1 {
  text-align: center;
  padding: 2rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border-radius: 50px;
  background-color: #00a6d870;
  text-align: center;
}
.contenedor {
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.shadow {
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
}

.fullScreen:hover,
.fullScreen:focus, 
.icono:hover,
.icono:focus {
  transform: translateY(-0.25em);
}

</style>
