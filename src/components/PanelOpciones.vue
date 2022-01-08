<template>
  <div>
    <el-tooltip class="item" content="No disponible" placement="right" effect="dark" >
      <button id="fullScreen" class="fullScreen shadow" @click="fullScreen"> <i class="fas fa-expand fa-3x"></i> </button>
    </el-tooltip>

    <div class="orientacion">
      <el-form
        :label-position="form.labelPosition"
        :model="form.formLabelAlign"
      >
        
        <span class="label">Orientación</span>
        <div class="input">
          <el-radio-group v-model="orientacion" @change="OnCambioParametros">
            <el-radio-button label="Vertical"   ></el-radio-button>
            <el-radio-button label="Horizontal" ></el-radio-button>
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
        <span class="label">Mantener notas</span>
        <div class="input">
          <el-radio-group v-model="holdearNotas" @change="cambioHoldearNotas">
            <el-radio-button label="Sí" ></el-radio-button>
            <el-radio-button label="No" ></el-radio-button>
          </el-radio-group>
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
      regularWorker: new Worker("/workers/canvasWorker.js"),
      orientacion: 'Vertical',
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
      holdearNotas: 'No',
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
      /* comentado hasta futuro aviso
      var canvas = document.getElementById('canvas')
      if(canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      }
      else {
        canvas.mozRequestFullScreen();
      }
      */
    },
    cambioHoldearNotas() {
      let holdearNotasOpciones;
      if(this.holdearNotas == 'Sí') {
        holdearNotasOpciones = true
      } else {
        holdearNotasOpciones = false
      }
      this.regularWorker.postMessage({
        "opciones": 
        {
          holdearNotas: holdearNotasOpciones
        }
      });
    },
    OnCambioParametros() {
      // nada todavia
    },
    cambiarNota(nota) {
      nota.disabled = false
      nota.numero = ""
    },
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
}
</style>

