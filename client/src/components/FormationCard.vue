<template>
  <div class="w-1/2 m-auto mt-5 flex flex-col gap-4 font-inter">
    <div
      class="border-space-cadet border-2 rounded-lg"
      :class="{ 'border-white border-2 rounded-bl-lg rounded-br-lg': isHidden }"
    >
      <div
        class="h-16 flex items-center justify-between"
        :class="{
          'bg-space-cadet text-white border-b-2 rounded-tl-lg rounded-tr-lg':
            isHidden,
        }"
      >
        <div
          class="cursor-pointer border-r-2 h-16 w-16 flex justify-center items-center border-space-cadet"
          @click="select(), $emit('manageCart')"
          :class="{
            'border-white': isHidden,
            'bg-space-cadet text-white': isSelected && !isHidden,
          }"
        >
          <FontAwesomeIcon
            icon="fa-circle-plus"
            class="h-5"
            v-if="!isSelected"
          />
          <FontAwesomeIcon
            icon="fa-circle-minus"
            class="h-5"
            v-if="isSelected"
          />
        </div>

        <h1 class="pl-5 pr-5">{{ disp.formationName }}</h1>

        <div
          class="cursor-pointer border-l-2 h-16 w-16 flex justify-center items-center border-space-cadet"
          :class="{ 'border-white': isHidden }"
          @click="toggle()"
        >
          <FontAwesomeIcon icon="fa-caret-down" v-if="!isHidden" class="h-5" />
          <FontAwesomeIcon icon="fa-caret-up" v-if="isHidden" class="h-5" />
        </div>
      </div>
      <div
        v-if="isHidden"
        class="bg-space-cadet p-5 m-auto flex flex-col gap-2 text-white"
        :class="{
          'border-white border-b-2 rounded-bl-lg rounded-br-lg': isHidden,
        }"
      >
        <p><b>Type de formation : </b>{{ disp.typeFormation }}</p>
        <p><b>Structure : </b>{{ disp.Structure }}</p>
        <p><b>Organisme : </b>{{ disp.organismeType }}</p>
        <p><b>Durée : </b>{{ disp.duration }} Jours</p>
        <p><b>Emplacement de la structure : </b>{{ disp.structLoc }}</p>
        <p><b>Accès : </b>{{ disp.access }}</p>
        <p><b>Url : </b>{{ disp.url }}</p>
        <hr />
        <p>
          <br />
          {{ disp.programDescription.replace('\n','<br />') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onUpdated } from "vue"

export default {
  name: "FormationCard",
  props: {
    formation: {
      type: Object,
      default() {
        return {}
      },
    },
    cart: Array,
  },
  setup(props) {
    const disp = ref(props.formation)
    const cart = ref(props.cart)

    const isHidden = ref(false)
    const isSelected = ref(false)

    function toggle() {
      isHidden.value = !isHidden.value
    }

    onBeforeMount(() => {
      refreshFormaton()
    })

    function refreshFormaton() {
      isSelected.value =
        cart.value.find((formation) => formation._id == disp.value._id) != null
          ? true
          : false
    }

    onUpdated(() => {
      disp.value = props.formation
      cart.value = props.cart

      refreshFormaton()
      console.log("update fired")
    })

    function select() {
      isSelected.value = !isSelected.value
    }

    return {
      disp,
      isHidden,
      toggle,
      isSelected,
      select,
    }
  },
}
</script>
