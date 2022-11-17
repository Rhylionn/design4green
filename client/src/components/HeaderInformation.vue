<template>
  <header class="text-center p-3 bg-cyan-900 items-center flex flex-col">
    <p class="text-white text-2xl">Equipe 15</p>
    <h1 class="text-white text-5xl">Choix des formations</h1>

    <button
      aria-labe="Basket"
      class="my-2.5 h-8 w-32 rounded-lg bg-slate-400 text-black text-2xl flex items-center justify-center hover:bg-emerald-500 cursor-pointer"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="fa-cart-shopping" class="pr-2.5" />
      
    </button>

    <CartModal :modalActive="modalActive" @close-modal="toggleModal" :cart="cart">
      <div class="flex justify-between items-center w-full gap-10">
        <button class="text-white mt-8 p-2 bg-space-cadet rounded-lg cursor-pointer border-2 border-space-cadet hover:bg-black-coral">Demander un devis par mail</button>
        <button class="text-white mt-8 p-2 bg-space-cadet rounded-lg cursor-pointer border-2 border-space-cadet hover:bg-black-coral">Exporter en PDF</button>
      </div>
        <p v-if="cartContent()">Votre panier est vide !</p>
        <table v-if="!cartContent()" class="text-center mt-5 w-4/5 m-auto">
          <thead class="border-2 border-space-cadet">
            <tr>
              <th class="p-2 border-r-2 border-space-cadet">Intitulé</th>
              <th class="p-2 border-r-2 border-space-cadet">Type</th>
              <th class="p-2 border-r-2 border-space-cadet">Structure</th>
              <th class="p-2 border-r-2 border-space-cadet">Durée</th>
              <th class="p-2">Emplacement</th>
            </tr>
          </thead>
          <tbody v-for="formation in cart" class="border-2 border-space-cadet">
            <tr>
              <td class="p-2 border-r-2 border-space-cadet">{{formation.formationName}}</td>
              <td class="p-2 border-r-2 border-space-cadet">{{formation.typeFormation}}</td>
              <td class="p-2 border-r-2 border-space-cadet">{{formation.Structure}}</td>
              <td class="p-2 border-r-2 border-space-cadet">{{formation.duration}}</td>
              <td class="p-2">{{formation.structLoc}}</td>
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
    let cart = ref(props.cart)
    const emptyCart = ref(false)
    const modalActive = ref(null)
    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }
    function afficherListe(){
      let currentCart = []
      for(let i;i<cart.value.length;i++){
        currentCart.push(cart.value[i])
      }
      return currentCart
    }
    function cartContent(){
      if(cart.value.length==0){
        emptyCart.value = true
      } else {
        emptyCart.value = false
      }
      return emptyCart.value
    }
    return { modalActive, toggleModal, cart, afficherListe, cartContent}
    
    
  },
}
</script>
