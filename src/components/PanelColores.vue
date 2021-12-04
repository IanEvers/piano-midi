<template>
  <div>
    <div class="flex icono" id="guardarColor" @click="guardarColores">
      <i class="fas fa-save fa-2x noColor"></i>
    </div>
    <div class="flex icono" id="abrirColor">
      <i class="fas fa-folder-open fa-2x noColor"></i>
    </div>
    <div class="flex icono" id="">
      <i class="fas fa-plus fa-2x noColor" id="agregarColor"  @click="agregarColor"></i>
    </div>
    <div class="flex icono eliminarcolor" id="" >
      <i class="fas fa-trash fa-2x noColor" :class="{ borde: eliminarColores }" id="borrarColor"  @click="coloresEliminables"></i>
    </div>
  </div>
  <div class="colores">
    <div class="estilo shadow">
      <i class="fas fa-palette fa-2x noColor color"></i>
      <div class="columnaColores">
        <div v-for="(paleta, index) in paletas" :key="index">
          <div v-if="(paleta.activo)">
            <div v-for="(color, index) in paleta.paleta.colores" :key="index">
              <Color
                v-model="color.color" :colorEliminable="eliminarColores" @borrar="borrarColor(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Color from './Color.vue'

export default {
  name: 'PanelColores',
  props: {
    
  },
  components: {
    Color
  },
  data() {
    return {
      paletas: [
        {
          paleta: paletaInicial,
          activo: true,
          id: 1
        },
      ],
      siguienteId: 2,
      eliminarColores: false
    }
  },
  mounted() {
    if (localStorage.getItem('paletas')) {
      try {
        this.paletas = JSON.parse(localStorage.getItem('paletas'));
      } catch(e) {
        localStorage.removeItem('paletas');
      }
    }
  },
  methods: {
    agregarColor: function () {
      var paletaActiva = this.paletaActiva();
      if(paletaActiva.colores.length < 7) { /* 7 colores como máximo */ 
        paletaActiva.colores.push({
          id: paletaActiva.siguienteId++,
          color: this.$parent.colorRandom()
        })
      }
    },
    guardarColores () {
      localStorage.paletas  = JSON.stringify(this.paletas)
    },
    coloresEliminables() {
      this.eliminarColores = !this.eliminarColores
    },
    borrarColor(index) {
      var paletaActiva = this.paletaActiva();
      paletaActiva.colores.splice(index, 1)
      paletaActiva.siguienteId--
    },
    paletaActiva() {
      return this.paletas.find(paleta => paleta.activo == true).paleta;
    }
  },
}

function colorRandom() {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

const paletaInicial = {
  nombre: 'paletaInicial',
  colores: [
    {
      id: 1,
      color: colorRandom()
    },
    {
      id: 2,
      color: colorRandom()
    },
    {
      id: 3,
      color: colorRandom()
    }
  ],
  siguienteId: 4,
};

</script>

<style scoped>

.colores {
  padding-right: 1rem;
}

.flex {
  display: flex;
  justify-content: center;
}

.shadow {
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
}

.estilo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid #ccc;
  padding : 0.2rem;
  background-color: #e9e5e6;
  margin-bottom: 1rem;
  max-height: 80vh;
  text-align: center;
}

.columnaColores {
  display: flex;
  flex-direction: column;
}

.color {
  background-color: #e9e5e6;
  margin-bottom: 0.5rem;
  align-self: center;
}

.icono {
  margin: 1rem;
}

.borde {
  border: 2px solid grey;
}

.noColor {
  background-color: #e9e5e6;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  border-radius: 50px;
  padding : 1rem;
  align-self: center;
}

.agregarColor {
  padding: 1rem;
}

.eliminarcolor {
  color: red;
}

</style>

