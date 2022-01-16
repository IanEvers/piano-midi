<template>
  <button v-if="colorEliminable" class="colorEliminable ">
     <i class="fas fa-minus-circle fa-lg" @click="$emit('borrar')"></i>
  </button>
  <input 
    type="color"
    class="color"
    :class="{ seleccionado: seleccionado }" 
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    @contextmenu.prevent="$emit('seleccion')"
  >
</template>

<script>

export default {
  name: 'Color',
  props: ['modelValue', 'colorEliminable', 'seleccionado'],
  emits: ['update:modelValue', 'borrar', 'seleccion'],
}

</script>

<style scoped>

input[type="color"] {
  -webkit-appearance: none;
	border: none;
	width: 50px;
	height: 50px;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 12px;
}

.color {
  background-color: #e9e5e6;
  margin-bottom: 0.5rem;
  align-self: center;
}

.colorEliminable {
  position: absolute;
  color: red;
  background-color: white;
  border-radius: 50px;
}

button {
  background: none;
  border: none;
  padding: 0;
}

.seleccionado {
  border: #e9e5e6 4px solid !important;
  outline: 3px solid black ;
  border-radius: 50px;
}

</style>