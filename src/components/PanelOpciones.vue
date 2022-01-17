<template>
  <div>
    <el-tooltip class="item" content="No disponible" placement="right" effect="dark">
      <button id="fullScreen" class="fullScreen shadow" @click="fullScreen"> <i class="fas fa-expand fa-3x"></i> </button>
    </el-tooltip>
    <button class="fullScreen shadow" @click="borrarCanvas"> <i class="fas fa-redo fa-3x"></i> </button>
    <div class="orientacion">
      <el-form
        :label-position="form.labelPosition"
        :model="form.formLabelAlign"
      >
        <span class="label">Nota más grave</span>
        <div class="input flex">
          <el-input-number 
            v-model="opciones.notaMasBaja"
            :min="33"
            :max="180"
            @change="OnCambioParametros()" 
          />
        </div>
        <span class="label">Nota más aguda</span>
        <div class="input flex">
          <el-input-number 
            v-model="opciones.notaMasAlta" 
            :min="33" 
            :max="180" 
            @change="OnCambioParametros()" 
          />
        </div>

        <span class="label">Orientación</span>
        <div class="input">
          <el-radio-group 
            v-model="opciones.orientacion" 
            @change="OnCambioParametros()"
          >
            <el-radio-button label="Vertical"  ></el-radio-button>
            <el-radio-button label="Horizontal"></el-radio-button>
          </el-radio-group>
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            class="botonDisplayPiano"
            type="button" 
          > 
            {{nota(this.opciones.notaMasBaja + 2)}} 
          </button>
        </div>

        <span class="label">Velocidad</span>
        <div class="input">
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            type='button' class="botonDisplayPiano botonGrosor"
          >  
            {{nota(this.opciones.notaMasBaja + 3)}} 
          </button>
          <el-input-number 
            v-model="opciones.velocidad" 
            :min="33" 
            :max="180"
            @change="OnCambioParametros()" 
          />
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            type='button'
            class="botonDisplayPiano botonGrosor"
          >
            {{nota(this.opciones.notaMasBaja + 4)}} 
          </button>
        </div>
        <span class="label">Grosor de línea</span>
        <div class="input">
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            class="botonDisplayPiano botonGrosor"
            type="button"
          >
            {{nota(this.opciones.notaMasBaja + 7)}} 
          </button>
          <el-input-number 
            v-model="opciones.grosorLinea"  
            @change="OnCambioParametros()"
            class="grosorLineaInput"
          > </el-input-number>
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            class="botonDisplayPiano botonGrosor"
            type="button"
          >
            {{nota(this.opciones.notaMasBaja + 8)}} 
          </button>
        </div>
        <span class="label">Mantener notas</span>
        <div class="input">
          <el-radio-group 
            v-model="form.holdearNotas.label" 
            @change="cambioHoldearNotas()"
          >
            <el-radio-button label="Sí"></el-radio-button>
            <el-radio-button label="No"></el-radio-button>
          </el-radio-group>
          <button 
            :class="{transparent: !pianoControllersDisplay}" 
            class="botonDisplayPiano"
            type="button" 
          >
            {{nota(this.opciones.notaMasBaja + 9)}} 
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import MidiNote from 'midi-note'

export default {
  name: 'PanelOpciones',
  components: {
  },
  data() {
    return {
      opciones: {
        orientacion: 'Vertical',
        velocidad: 60,
        notaMasBaja: 36,
        notaMasAlta: 84,
        grosorLinea: 10,
        holdearNotas: false,
        color: 'red'
      },

      form: {
        holdearNotas:  {
          label:'No',
        },
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
      },
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
    this.OnCambioParametros()
  },
  methods: {
    cambioHoldearNotas() {
      this.opciones.holdearNotas = !this.opciones.holdearNotas
      this.OnCambioParametros()
    },
    OnCambioParametros() {
      this.$store.notaMasBaja = this.opciones.notaMasBaja
      this.regularWorker.postMessage({
        "opciones": 
        {
          opciones: {...this.opciones}
        }
      });
    },
    borrarCanvas() {
      this.regularWorker.postMessage({
        "borrarCanvas" : true
      })
    },
    nota(nota) {
      return MidiNote(nota)
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

.label {
  padding: 0px !important;
}

.flex {
  display: flex;
}

.el-slider__runway {
  background-color: #4f596c !important;
}

.input {
  padding: 0.7rem;
  display: flex;
  align-items: center;
}

.grosorLineaInput {
  width: 15rem;
}

.transparent {
  opacity: 0.1;
}

.botonDisplayPiano {
  margin-left: 1rem;
  background-color: white;
  padding: 0.7rem;
  border: none;
}

.botonGrosor {
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

</style>

