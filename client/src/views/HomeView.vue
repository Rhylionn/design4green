<script>
import { ref, onBeforeMount, computed } from "vue"

import HeaderInformation from "../components/HeaderInformation.vue"
import MapFormations from "../components/MapFormations.vue"
import FormationCard from "../components/FormationCard.vue"

export default {
  name: "HomeView",
  components: {
    HeaderInformation,
    MapFormations,
    FormationCard,
  },
  props: {
    formations: Array,
  },
  setup(props) {
    const formations = ref([])
    const filterByText = ref("")
    const inputFormationType = ref("")
    const inputStructure = ref("")
    const inputAccess = ref("")
    const inputBorneInf = ref(0)
    const inputBorneSup = ref(58)

    const cart = ref([])

    const filteredFormations = computed(() => {
      return formations.value.filter((formation) => {
        if (
          filterByText.value != "" ||
          inputFormationType.value != "" ||
          inputStructure.value != "" ||
          inputAccess.value != "" ||
          typeof inputBorneInf.value != "undefined" ||
          typeof inputBorneSup.value != "undefined"
        ) {
          return formation.hasOwnProperty("formationName") &&
            formation.formationName
              .toLowerCase()
              .includes(filterByText.value) &&
            formation.hasOwnProperty("typeFormation") &&
            formation.typeFormation
              .toLowerCase()
              .includes(inputFormationType.value) &&
            formation.hasOwnProperty("Structure") &&
            formation.Structure.toLowerCase().includes(inputStructure.value) &&
            formation.hasOwnProperty("access") &&
            formation.access.toLowerCase().includes(inputAccess.value) &&
            formation.hasOwnProperty("duration") &&
            formation.duration >= (inputBorneInf.value ?? 0) &&
            formation.hasOwnProperty("duration") &&
            formation.duration <= (inputBorneSup.value ?? 58)
            ? true
            : false
        } else {
          return true
        }
      })
    })

    onBeforeMount(() => {
      formations.value = props.formations
    })

    function manageCart(disp) {
      if (cart.value.includes(disp)) {
        const index = cart.indexOf(disp)
        cart.splice(index, 1)
      } else {
        cart.value.push(disp)
      }
    }

    return {
      filteredFormations,
      filterByText,
      inputFormationType,
      inputStructure,
      inputAccess,
      inputBorneInf,
      inputBorneSup,
      manageCart,
    }
  },
}
</script>

<template>
  <main>
    <HeaderInformation />
    <form class="filters">
      <input type="text" v-model="filterByText" />

      <div>
        <label for="typeFormation">Selectionnez un type de formation</label>
        <select
          name="typeFormation"
          id="typeFormation"
          v-model="inputFormationType"
        >
          <option value="continue">Formation continue</option>
          <option value="initiale">Formation initiale</option>
          <option value="formation initiale et formation continue">
            Formation initiale et formation continue
          </option>
          <option value="">Vide</option>
        </select>

        <label for="Structure">Sélectionnez un type de structure</label>
        <select name="Structure" id="Structure" v-model="inputStructure">
          <option value="priv">Privée</option>
          <option ListeFormation value="">Vide</option>
        </select>

        <label for="access">Sélectionnez un type d’accès</label>
        <select name="access" id="access" v-model="inputAccess">
          <option value="présentiel">Présentiel</option>
          <option value="distanciel">Distanciel</option>
          <option value="distanciel et distanciel">
            Présentiel ou distanciel
          </option>
          <option value="">Vide</option>
        </select>

        <label for="minDuration">Entrez une durée min</label>
        <input
          type="number"
          name="minDuration"
          id="minDuration"
          min="0"
          v-model="inputBorneInf"
          @change="
            () => {
              if (inputBorneInf > inputBorneSup) {
                inputBorneSup = inputBorneInf + 1
              }
            }
          "
        />

        <label for="maxDuration">Entrez une durée max</label>
        <input
          type="number"
          name="maxDuration"
          id="maxDuration"
          min="0"
          v-model="inputBorneSup"
          @change="
            () => {
              if (inputBorneSup <= inputBorneInf) {
                inputBorneSup = inputBorneInf + 1
              }
            }
          "
        />
      </div>
    </form>

    <MapFormations :formations="filteredFormations" />

    <FormationCard
      v-for="(formation, index) in filteredFormations"
      :key="index"
      :formation="formation"
      @manageCart="manageCart(formation)"
    />
  </main>
</template>
