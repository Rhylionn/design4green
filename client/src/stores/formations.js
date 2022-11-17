import { defineStore } from "pinia"
import { ref } from "vue"

export const useFormationStore = defineStore("formations", () => {
  const cart = ref([])

  const addFormation = (formation) => {
    cart.value.push(formation)
  }

  const removeFormation = (formation) => {
    cart.value.splice(getIndex(formation), 1)
  }

  const getIndex = (formation) => {
    return cart.value.indexOf(formation)
  }

  return { cart, addFormation, removeFormation, getIndex }
})
