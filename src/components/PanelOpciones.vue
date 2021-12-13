<template>
  <div>
    <button id="fullScreen" class="fullScreen shadow" @click="fullScreen"> <i class="fas fa-expand fa-3x"></i> </button>
    <button id="pausa" class="fullScreen shadow " @click="togglePausa()"> 
      <i v-if="pausa" class="fas fa-play fa-3x "></i> 
      <i v-else class="fas fa-pause fa-3x "></i> 
    </button>

    <div class="orientacion">
      <el-form
        :label-position="form.labelPosition"
        :model="form.formLabelAlign"
      >
        
        <span class="label">Orientación</span>
        <div class="input">
          <el-radio-group v-model="orientacion" @change="OnCambioParametros">
            <el-radio-button label="Vertical" ></el-radio-button>
            <el-radio-button label="Horizontal"></el-radio-button>
          </el-radio-group>
        </div>

        <span class="label">Velocidad</span>
        <div class="input">
          <el-input-number v-model="velocidad" :min="33" :max="180" @change="OnCambioParametros" />
        </div>
        <span class="label">Nota más grave</span>
        <div class="input flex">
          <el-input v-model="notaMasBaja.numero" :disabled="notaMasBaja.disabled" :min="33" :max="180" @change="OnCambioParametros" />
          <el-button type="primary" @click="cambiarNota(notaMasBaja)"> <i class="fas fa-exchange-alt"></i> </el-button>
        </div>
        <span class="label">Nota más aguda</span>
        <div class="input flex">
          <el-input v-model="notaMasAlta.numero" :disabled="notaMasAlta.disabled" :min="33" :max="180" @change="OnCambioParametros" />
          <el-button type="primary" @click="cambiarNota(notaMasAlta)"> <i class="fas fa-exchange-alt"></i> </el-button>
        </div>
        <span class="label">Grosor de línea</span>
        <div class="input">
          <el-slider v-model="grosorDeLinea" show-input></el-slider>
        </div>
      
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'PanelOpciones',
  components: {
  },
  data() {
    return {
      orientacion: 'Vertical',
      pausa: true,
      velocidad: 60,
      notaMasBaja: {
        disabled: true,
        numero: 62
      },
      notaMasAlta: {
        disabled: true,
        numero: 86
      },
      grosorDeLinea: 50,
      form: {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
      },
    }
  },
  methods: {
    fullScreen() {
      var canvas = document.getElementById('canvas')
      if(canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      }
      else {
        canvas.mozRequestFullScreen();
      }
    },
    OnCambioParametros() {
      // nada todavia
    },
    cambiarNota(nota) {
      nota.disabled = false
      nota.numero = ""
    },
    togglePausa() {
      this.pausa = !this.pausa
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

.pausa {
  color: #534b4b;
  padding-left: 1rem;
  padding-right: 1rem;
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
}
</style>

