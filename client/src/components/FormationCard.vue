<template>
  <div class="w-full m-auto mt-5 text-xs sm:text-base">
    <div
      class="border-space-cadet border-2 rounded-lg"
      :class="{ 'border-white border-2 rounded-bl-lg rounded-br-lg': isHidden }"
    >
      <div
        class="h-16 flex items-center w-full justify-between sm:h-fit"
        :class="{
          'bg-space-cadet text-white border-b-2 rounded-tl-lg rounded-tr-lg font-bold':
            isHidden,
        }"
      >
        <div
          class="cursor-pointer border-r-2 h-16 sm:h-24 lg:h-16 w-10 sm:w-16 flex justify-center items-center border-space-cadet"
          @click="select()"
          :class="{
            'border-white': isHidden,
            'bg-space-cadet text-white': isSelected && !isHidden,
          }"
        >
          <FontAwesomeIcon
            alt="Ajouter au panier"
            icon="fa-circle-plus"
            class="h-5"
            v-if="!isSelected"
          />
          <FontAwesomeIcon
            alt="Retirer du panier"
            icon="fa-circle-minus"
            class="h-5"
            v-if="isSelected"
          />
        </div>
        <h3
          class="pl-5 pr-5 w-4/5 text-md sm:text-lg md:text-xl sm:w-[90%] text-center"
        >
          {{ formationName() }}
        </h3>

        <div
          class="cursor-pointer border-l-2 h-16 sm:h-24 lg:h-16 w-10 sm:w-16 flex justify-center items-center border-space-cadet"
          :class="{ 'border-white': isHidden }"
          @click="toggle()"
        >
          <FontAwesomeIcon
            alt="Afficher les détails de la formation."
            icon="fa-caret-down"
            v-if="!isHidden"
            class="h-5"
          />

          <FontAwesomeIcon
            alt="Masquer les détails de la formation."
            icon="fa-caret-up"
            v-if="isHidden"
            class="h-5"
          />
        </div>
      </div>
      <div
        v-if="isHidden"
        class="bg-space-cadet p-5 m-auto flex flex-col gap-2 text-white"
        :class="{
          'border-white border-b-2 rounded-bl-lg rounded-br-lg': isHidden,
        }"
      >
        <p><b>Type de formation : </b>{{ currentFormation.typeFormation }}</p>
        <p><b>Structure : </b>{{ currentFormation.Structure }}</p>
        <p><b>Organisme : </b>{{ currentFormation.organismeType }}</p>
        <p><b>Durée : </b>{{ currentFormation.duration }} Jours</p>
        <p>
          <b>Emplacement de la structure : </b>{{ currentFormation.structLoc }}
        </p>
        <p><b>Accès : </b>{{ currentFormation.access }}</p>
        <p><b>Url : </b>{{ currentFormation.url }}</p>
        <hr />
        <p>
          <br />
          {{ currentFormation.programDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onUpdated } from "vue"
import { useFormationStore } from "../stores/formations"

export default {
  name: "FormationCard",
  props: {
    formation: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const currentFormation = ref(props.formation)

    const isHidden = ref(false)
    const isSelected = ref(false)

    const cart = useFormationStore()

    function toggle() {
      isHidden.value = !isHidden.value
    }

    onUpdated(() => {
      currentFormation.value = props.formation
      isSelected.value =
        cart.getIndex(currentFormation.value) < 0 ? false : true
    })

    function select() {
      isSelected.value = !isSelected.value
      if (cart.getIndex(currentFormation.value) < 0) {
        cart.addFormation(currentFormation.value)
      } else {
        cart.removeFormation(currentFormation.value)
      }
    }

    function formationName() {
      if (currentFormation.value.hasOwnProperty("formationName")) {
        return currentFormation.value.formationName
      } else {
        return "Formation"
      }
    }

    return {
      currentFormation,
      isHidden,
      toggle,
      isSelected,
      select,
      formationName,
    }
  },
}
</script>
