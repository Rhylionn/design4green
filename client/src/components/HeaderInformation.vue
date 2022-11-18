<template>
  <header class="text-center p-3 bg-space-cadet items-center flex justify-evenly h-24">
    <p class="text-white text-md md:text-xl hidden sm:flex">Equipe 15</p>
    <h1 class="text-white text-xl sm:text-2xl md:text-3xl">Choix des formations</h1>

    <button
      aria-label="Basket"
      class="w-fit px-3 py-3 sm:px-5 sm:py-2 rounded-xl bg-white text-black text-2xl flex items-center justify-center cursor-pointer"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="fa-cart-shopping"/>
			<span class="md:ml-2 hidden sm:flex text-sm">mon panier</span>
    </button>

    <CartModal :modalActive="modalActive" @close-modal="toggleModal" :cart="cart">
      <div class="text-xs sm:text-sm md:text-base flex justify-between items-center w-4/5">
        <a v-show="!cartContent()" :href="sendMail()" class="text-white mt-8 h-16 sm:h-14 md:h-16 p-2 w-1/3 bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral">Demander un devis par mail</a>
        <button v-show="!cartContent()" class="text-white mt-8 h-16 sm:h-14 md:h-16 p-2 w-1/3 bg-space-cadet rounded-lg cursor-pointer hover:bg-black-coral">Exporter en PDF</button>
      </div>
        <p class="mt-5" v-if="cartContent()">Votre panier est vide !</p>
        <table v-if="!cartContent()" class="m-2 text-xs md:text-base w-4/5">
          <thead class="p-2 border-2 border-space-cadet">
            <tr>
              <th class="p-2 border-2 border-space-cadet ">Intitulé</th>
              <th class="p-2 border-2 border-space-cadet hidden md:table-cell">Type</th>
              <th class="p-2 border-2 border-space-cadet hidden md:table-cell">Structure</th>
              <th class="p-2 border-2 border-space-cadet hidden md:table-cell">Durée</th>
              <th class="p-2 border-2 border-space-cadet hidden lg:table-cell">Emplacement</th>
              <th class="p-2 border-2 border-space-cadet ">Supprimer la formation</th>
            </tr>
          </thead>
          <tbody :key="index" v-for="(formation, index) in cart" class="p-2 border-2 border-space-cadet text-center">
            <tr>
              <td class="p-2 border-2 border-space-cadet ">{{formation.formationName}}</td>
              <td class="p-2 border-2 border-space-cadet hidden md:table-cell">{{formation.typeFormation}}</td>
              <td class="p-2 border-2 border-space-cadet hidden md:table-cell">{{formation.Structure}}</td>
              <td class="p-2 border-2 border-space-cadet hidden md:table-cell">{{formation.duration}}</td>
              <td class="p-2 border-2 border-space-cadet hidden lg:table-cell">{{formation.structLoc}}</td>
              <td class="p-2 border-2 border-space-cadet hover:bg-orange cursor-pointer" @click="deleteFormation(formation)">Supprimer</td>
            </tr>
          </tbody>
        </table>
      

    </CartModal>
  </header>
</template>

<script>
import { ref } from "vue"
import CartModal from "./CartModal.vue"

export default {
  name: "HeaderInformation",
  props: {
    cart: {
      type: Array,
      default() {
        []
      }
    }
  } ,
  components: {
    CartModal,
  },
  setup(props) {
    const cart = ref(props.cart)
    const emptyCart = ref(false)
    const modalActive = ref(false)

    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }

    function cartContent(){
      if(cart.value.length==0){
        emptyCart.value = true
      } else {
        emptyCart.value = false
      }
      return emptyCart.value
    }

    function deleteFormation(formation) {
        cart.value.splice(cart.value.indexOf(formation), 1)
    }

    function sendMail(){
        const objet = `Demande de devis pour ${cart.value.length} formation(s)`
        let message = "Bonjour, \n Je souhaiterai avoir un devis pour les formations suivantes :\n"
        for(let i=0;i<cart.value.length;i++){
          message += `- Formation par ${cart.value[i].organismeName} d'une durée de ${cart.value[i].duration} jour(s)\n`
        }
        return `mailto:design4green@etik.com?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(message)}`
    }

    return { modalActive, toggleModal, cart, cartContent, deleteFormation, sendMail}
    
    
  },
}
</script>
