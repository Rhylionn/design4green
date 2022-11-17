<template>
  <header class="text-center p-3 bg-space-cadet items-center flex justify-evenly h-24">
    <p class="text-white text-2xl">Equipe 15</p>
    <h1 class="text-white text-3xl">Choix des formations</h1>

    <button
      aria-labe="Basket"
      class="w-fit px-5 py-2 rounded-xl bg-white text-black text-2xl flex items-center justify-center cursor-pointer"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="fa-cart-shopping"/>
			<span class="ml-2 text-sm">mon panier</span>
    </button>

    <CartModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="text-black">
        <h1 class="text-2xl mb-1">About:</h1>
        <p class="mb-4">
          The Local Weather allows you to track the current and future weather
          of cities of your choosing.
        </p>
        <h2 class="text-2xl">How it works:</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>
            Search for your city by entering the name into the search bar.
          </li>
          <li>
            Select a city within the results, this will take you to the current
            weather for your selection.
          </li>
          <li>
            Track the city by clicking on the "+" icon in the top right. This
            will save the city to view at a later time on the home page.
          </li>
        </ol>

        <h2 class="text-2xl">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select the city within
          the home page. At the bottom of the page, there will be am option to
          delete the city.
        </p>
      </div>
    </CartModal>
  </header>
</template>

<script>
import { ref } from "vue"
import CartModal from "./CartModal.vue"

export default {
  name: "HeaderInformation",
  components: {
    CartModal,
  },
  setup() {
    const modalActive = ref(null)
    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }

    return { modalActive, toggleModal }
  },
}
</script>
