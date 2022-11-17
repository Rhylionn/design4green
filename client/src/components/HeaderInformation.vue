<template>
  <header
    class="text-center p-3 bg-space-cadet items-center flex justify-evenly h-24"
  >
    <p class="text-white text-md md:text-xl hidden sm:flex">Equipe 15</p>
    <h1 class="text-white text-xl sm:text-2xl md:text-3xl">
      Choix des formations
    </h1>

    <button
      aria-labe="Basket"
      class="w-fit px-3 py-3 sm:px-5 sm:py-2 rounded-xl bg-white text-black text-2xl flex items-center justify-center cursor-pointer"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="fa-cart-shopping" />
      <span class="md:ml-2 hidden sm:flex text-sm">mon panier</span>
    </button>

    <CartModal :modalActive="modalActive" @close-modal="toggleModal">
      <div
        class="text-xs sm:text-sm md:text-base flex justify-between items-center w-4/5"
      >
        <button
          class="text-white mt-8 h-16 sm:h-14 md:h-16 p-2 w-1/3 bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral"
        >
          Demander un devis par mail
        </button>
        <button
          class="text-white mt-8 h-16 sm:h-14 md:h-16 p-2 w-1/3 bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral"
        >
          Exporter en PDF
        </button>
      </div>
      <p class="mt-5" v-show="cartContent()">Votre panier est vide !</p>
      <table v-show="!cartContent()" class="m-2 text-xs md:text-base w-4/5">
        <thead class="p-2 border-2 border-space-cadet">
          <tr>
            <th class="p-2 border-2 border-space-cadet">Intitulé</th>
            <th class="p-2 border-2 border-space-cadet hidden md:table-cell">
              Type
            </th>
            <th class="p-2 border-2 border-space-cadet hidden md:table-cell">
              Structure
            </th>
            <th class="p-2 border-2 border-space-cadet hidden md:table-cell">
              Durée
            </th>
            <th class="p-2 border-2 border-space-cadet hidden lg:table-cell">
              Emplacement
            </th>
            <th class="p-2 border-2 border-space-cadet">
              Supprimer la formation
            </th>
          </tr>
        </thead>
        <tbody
          :key="index"
          v-for="(formation, index) in cart"
          class="p-2 border-2 border-space-cadet text-center"
        >
          <tr>
            <td class="p-2 border-2 border-space-cadet">
              {{ formation.formationName }}
            </td>
            <td class="p-2 border-2 border-space-cadet hidden md:table-cell">
              {{ formation.typeFormation }}
            </td>
            <td class="p-2 border-2 border-space-cadet hidden md:table-cell">
              {{ formation.Structure }}
            </td>
            <td class="p-2 border-2 border-space-cadet hidden md:table-cell">
              {{ formation.duration }}
            </td>
            <td class="p-2 border-2 border-space-cadet hidden lg:table-cell">
              {{ formation.structLoc }}
            </td>
            <td
              class="p-2 border-2 border-space-cadet hover:bg-orange cursor-pointer"
              @click="deleteFormation(formation)"
            >
              Supprimer
            </td>
          </tr>
        </tbody>
      </table>
    </CartModal>
  </header>
</template>

<script>
import { ref, defineAsyncComponent } from "vue"

const CartModal = defineAsyncComponent({
  loader: () => import("../components/CartModal.vue"),
})

import { useFormationStore } from "../stores/formations"

export default {
  name: "HeaderInformation",
  components: {
    CartModal,
  },
  setup() {
    const cartStore = useFormationStore()

    const modalActive = ref(false)

    const cart = cartStore.cart

    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }

    function cartContent() {
      return cart.length == 0 ? true : false
    }

    function deleteFormation(formation) {
      cartStore.removeFormation(formation)
    }

    return { modalActive, toggleModal, cart, cartContent, deleteFormation }
  },
}
</script>
