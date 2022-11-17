<template>
  <header class="p-3 bg-cyan-900 text-center items-center flex justify-between">
    <!-- </header>:class="isDark ? 'dark dark:bg-black' : ''"-->
    <p class="text-white text-2xl">Equipe 15</p>
    <h1 class="text-white text-5xl">Choix des formations</h1>

    <div class="flex justify-end">
      <button
        aria-labe="Basket"
        class="my-2.5 h-8 w-32 rounded-lg bg-slate-400 text-black text-2xl flex items-center justify-center hover:bg-emerald-500 cursor-pointer"
        @click="toggleModal"
      >
        <FontAwesomeIcon icon="fa-cart-shopping" class="pr-2.5" />
        Panier
      </button>

      <button href="" class="py-2 px-2 mb-2.5" @click="$emit('enableDark')">
        <FontAwesomeIcon
          v-show="isDark"
          icon="fa-moon"
          class="py-1 px-1 h-8 w-8 hidden lg:flex md:flex"
        />
        <FontAwesomeIcon
        v-show="!isDark"
          icon="fa-sun"
          class="py-1 px-1 h-8 w-8 hidden lg:flex md:flex"
        />
      </button>
    </div>

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
import { ref } from "vue";
import CartModal from "./CartModal.vue";

export default {
  name: "HeaderInformation",
  components: {
    CartModal,
  },
  props: {
    enableDark: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  setup(props) {
    const modalActive = ref(null);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const isDark = ref(props.enableDark);
    
    return { modalActive, toggleModal, isDark };
  },
};
</script>
