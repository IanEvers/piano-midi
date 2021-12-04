<template>
  <div>
    <button id="fullScreen" class="fullScreen shadow" @click="fullScreen"> <i class="fas fa-expand fa-3x"></i> </button>
    <div class="orientacion">
        <button> horizontal</button>
        <button> vertical</button>
    </div>
    <div class="ajustes">
        <input type="number" id="velocidad" value="60">
        <input type="number" id="notaMasBaja" value="37">
        <input type="number" id="notaMasAlta" value="85">
        <input type="range" min="0.0" max="1.0" step="0.01">
        <input type="range" min="1" max="30.0" step="1">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelOpciones',
  methods: {
    fullScreen() {
      var canvas = document.getElementById('canvas')
      if(canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      }
      else {
        canvas.mozRequestFullScreen();
      }
    }
  }
}
</script>

<style>

.fullScreen {
  margin-left: 1rem;
  margin-bottom: 2rem;
  border: none;
  background-color: #e9e5e6;
  border-radius: 25px;
  padding: 0.8rem;
}

.orientacion {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-bottom: 3rem;
}

.ajustes {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}

</style>

