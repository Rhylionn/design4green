<template>
  <header
    class="text-center p-3 bg-space-cadet items-center flex justify-evenly h-24"
  >
    <p class="text-white text-md md:text-xl hidden sm:flex">Equipe 15</p>
    <h1 class="text-white text-xl sm:text-2xl md:text-3xl">
      Choix des formations
    </h1>

    <button
      class="w-fit px-3 py-3 sm:px-5 sm:py-2 rounded-xl bg-white text-black text-2xl flex items-center justify-center cursor-pointer"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="fa-cart-shopping" aria-hidden="true" />
      <span class="md:ml-2 hidden sm:flex text-sm">Mon Panier</span>
    </button>

    <CartModal :modalActive="modalActive" @close-modal="closeModal">
      <div class="text-xs sm:text-sm md:text-base flex justify-between px-7 pb-5 items-center w-full">
        <a
          v-show="!cartContent()"
          :href="sendMail()"
          class="text-white mt-8 h-16 sm:h-14 md:h-16 w-1/3 grid place-items-center bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral print:hidden"
          >Mon devis par email</a
        >
        <button
          v-show="!cartContent()"
          @click="generateReport()"
          class="text-white mt-8 h-16 grid place-items-center sm:h-14 md:h-16 p-2 w-1/3 bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral print:hidden"
        >
          Export PDF
        </button>
      </div>
      <p class="mt-5" v-show="cartContent()">Votre panier est vide !</p>
      <h1 class="hidden print:block text-2xl mb-10">
        Récapitulatif des formations sélectionnées
      </h1>
      <table
        aria-describedby="Répartition de différentes informations à propos des formations misent dans le panier."
        v-if="!cartContent()"
        class="m-2 text-xs md:text-base w-4/5 table-auto"
        media="print"
      >
        <thead class="p-2 border-2 border-space-cadet">
          <tr>
            <th class="p-2 border-2 border-space-cadet">Intitulé</th>
            <th
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              Type
            </th>
            <th
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              Structure
            </th>
            <th
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              Durée
            </th>
            <th
              class="p-2 border-2 border-space-cadet hidden print:table-cell lg:table-cell"
            >
              Emplacement
            </th>
            <th class="p-2 border-2 print:hidden border-space-cadet">
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
            <td
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              {{ formation.typeFormation }}
            </td>
            <td
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              {{ formation.Structure }}
            </td>
            <td
              class="p-2 border-2 border-space-cadet hidden print:table-cell md:table-cell"
            >
              {{ formation.duration }}
            </td>
            <tds
              class="p-2 border-2 border-space-cadet hidden print:table-cell lg:table-cell"
            >
              {{ formation.structLoc }}
            </tds>
            <td
              class="p-2 border-2 print:hidden border-space-cadet hover:bg-space-cadet hover:text-white cursor-pointer"
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
import { ref, defineAsyncComponent } from "vue";

const CartModal = defineAsyncComponent({
  loader: () => import("../components/CartModal.vue"),
});

import { useFormationStore } from "../stores/formations";

export default {
  name: "HeaderInformation",
  components: {
    CartModal,
  },
  setup() {
    const cartStore = useFormationStore();

    const modalActive = ref(false);

    const cart = cartStore.cart;

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const closeModal = () => {
      modalActive.value = false;
    };

    function cartContent() {
      return cart.length == 0 ? true : false;
    }

    function generateReport() {
      window.print();
    }

    function deleteFormation(formation) {
      cartStore.removeFormation(formation);
    }

    function sendMail() {
      const objet = `Demande de devis pour ${cart.length} formation(s)`;
      let message =
        "Bonjour, \n Je souhaiterai avoir un devis pour les formations suivantes :\n";
      for (let i = 0; i < cart.length; i++) {
        message += `- Formation par ${cart[i].organismeName} d'une durée de ${cart[i].duration} jour(s)\n`;
      }
      return `mailto:design4green@etik.com?subject=${encodeURIComponent(
        objet
      )}&body=${encodeURIComponent(message)}`;
    }

    return {
      modalActive,
      toggleModal,
      cart,
      cartContent,
      deleteFormation,
      sendMail,
      closeModal,
      generateReport,
    };
  },
};
</script>
