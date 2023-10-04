<template>
  <div class="modal fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 shadow-xl text-center">
      <h2 v-if="status == 'BIDDING'" class="text-lg font-bold">
        ¿Estas seguro que quieres ofertar?
      </h2>
      <h2 v-else class="text-lg font-bold">
        ¿Estas seguro que quieres pre ofertar?
      </h2>
      <p class="text-3xl font-bold">$ {{ amount }} USD</p>
      <div class="mt-4 flex justify-center">
        <button
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-4 transition duration-300 ease-in-out"
          @click="confirm"
        >
          Confirmar
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          @click="disableModal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: "",
    submitForm: { type: Function },
    disableModal: { type: Function },
    status: ""
  },
  data() {
    return {}
  },
  methods: {
    open() {
      this.showModal = true
    },
    close() {
      this.showModal = false
    },
    confirm(event) {
      this.submitForm(event)
      this.disableModal()
    }
  }
}
</script>

<style scoped>
/* Add your modal styling here */
.modal {
  background-color: rgba(128, 128, 128, 0.546);
}

.modal-content {
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

button {
  margin-top: 10px;
}
</style>
