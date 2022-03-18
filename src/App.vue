<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <Header> </Header>

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
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    PanelColores,
    Canvas,
    PanelOpciones,
    Header
  },
  data() {
    return {}
    
  },
  mounted() {
    
  },
  methods: {
    colorRandom() {
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    }
  }
}

</script>

<style>

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  margin: 0px;
  background-color: #dfebeb;
}

nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(255, 255, 255);
}

.hr {
  border: #242121a2 1px solid;
  height: 1.5rem;
}

.links {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}


.linkBtn {
  cursor: pointer;
  margin: 1rem;
  border: none;
  font-size: 1.1rem;
  background-color: white;
}

.linksDerecha {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guardarIcono {
  margin-right: 0.5rem;
}

.usuario {
  margin-left: 1rem;
  margin-right: 2rem;
}

.contenedor {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

.shadow {
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
}

.fullScreen:hover, 
.icono:hover {
  transform: translateY(-0.25em);

}

</style>
