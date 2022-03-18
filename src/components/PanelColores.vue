<template>
  <div>
    <div class="flex icono primerIcono" id="guardarColor" @click="guardarColores">
      <i class="fas fa-save fa-2x noColor"></i>
    </div>
    <div class="flex icono" id="abrirColor">
      <i class="fas fa-folder-open fa-2x noColor"></i>
    </div>
    <div class="flex icono" id="">
      <i class="fas fa-plus fa-2x noColor" id="agregarColor"  @click="agregarColor"></i>
    </div>
    <div class="flex icono eliminarcolor" id="" >
      <i class="fas fa-trash fa-2x noColor"
        :class="{ borde: eliminarColores }"
        id="borrarColor" 
        @click="coloresEliminables"
      ></i>
    </div>
  </div>
  <div class="colores">
    <el-tooltip
      effect="dark"
      content="Click derecho para elegir color"
      placement="right"
      transition="none"
      :hide-after="0"
    >
      <div class="estilo shadow">
        <i class="fas fa-palette fa-2x noColor color"></i>
        <div class="columnaColores">
          <div v-for="(paleta, index) in paletas" :key="index">
            <div v-if="(paleta.activo)">
              <div v-for="(color, index) in paleta.paleta.colores" :key="index">
                <Color
                  v-model="color.color"
                  :seleccionado="index == paleta.paleta.seleccionado"
                  :colorEliminable="eliminarColores"
                  @borrar="borrarColor(index)"
                  @seleccion="seleccionarColor(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-tooltip>
  
    <div class="controlesColores colores">
    <button 
      :class="{transparent: !pianoControllersDisplay}" 
      class="botonDisplayPiano botonGrosor"
      type="button"
    >
      {{nota(this.notaMasBajaStore + 2)}}
    </button>
    <button class="flechaControles"> <i class="fas fa-arrow-up fa-2x"></i> </button> 
    <button class="flechaControles"> <i class="fas fa-arrow-down fa-2x"></i> </button> 
  
    <button 
      :class="{transparent: !pianoControllersDisplay}" 
      class="botonDisplayPiano botonGrosor"
      type="button"
    >
      {{nota(this.notaMasBajaStore + 3)}} 
    </button>
    </div>
  </div>
</template>


<script>
import Color from './Color.vue'
import MidiNote from 'midi-note'

export default {
  name: 'PanelColores',
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
  computed: {
    regularWorker () {
      return this.$store.state.regularWorker
    },
    pianoControllersDisplay() {
      return this.$store.state.pianoControllersDisplay
    },
    notaMasBajaStore() {
      return this.$store.state.notaMasBaja
    },
  },
  mounted() {
    if (localStorage.getItem('paletas')) {
      try {
        this.paletas = JSON.parse(localStorage.getItem('paletas'));
      } catch(e) {
        localStorage.removeItem('paletas');
      }
    }
    this.seleccionarColor(0)
  },
  methods: {
    agregarColor: function () {
      var paletaActiva = this.paletaActiva();
      if(paletaActiva.colores.length < 10) { /* 7 colores como máximo */ 
        paletaActiva.colores.push({
          id: paletaActiva.siguienteId++,
          color: this.$parent.colorRandom()
        })
      }
    },
    guardarColores () {
      localStorage.paletas = JSON.stringify(this.paletas)
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
    },
    seleccionarColor(index) {
      this.paletaActiva().seleccionado = index

      this.regularWorker.postMessage({
        "color" : this.paletaActiva().colores[index].color
      });
    },
    nota(nota) {
      return MidiNote(nota)
    }
  },
}

function colorRandom() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

const paletaInicial = {
  nombre: 'paletaInicial',
  seleccionado: 0,
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

.primerIcono {
  margin-top: 0 !important;
}

.colores {
  padding-right: 0.8rem;
  display: flex;
  align-items: flex-start;
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
  border-radius: 50px;
  border: 1px solid #ccc;
  padding : 0.2rem;
  background-color: #e9e5e6;
  margin-bottom: 1rem;
  max-height: 80vh;
  text-align: center;
  margin-right: 1rem;
}

.columnaColores {
  display: flex;
  flex-direction: column;
}

.color {
  background-color: transparent;
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

.controlesColores {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
}

.flechaControles {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 25px;
  background: none;
}

</style>

