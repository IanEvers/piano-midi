<template>
  <button v-if="colorEliminable" class="colorEliminable"  >
     <i class="fas fa-minus-circle fa-lg" @click="$emit('borrar')"></i>
  </button>
  <input type="color" class="color" :value="modelValue" @focusout="$emit('update:modelValue', $event.target.value)">
</template>

<script>

export default {
  name: 'Color',
  props: ['modelValue', 'colorEliminable'],
  emits: ['borrar', 'update:modelValue']
}

</script>

<style scoped>

input[type="color"] {
  -webkit-appearance: none;
	border: none;
	width: 50px;
	height: 50px;
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
}

button {
  background: none;
  border: none;
  padding: 0;
}

</style>