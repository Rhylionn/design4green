<script>
import { ref, onBeforeMount, computed, defineAsyncComponent } from "vue"

import HeaderInformation from "../components/HeaderInformation.vue"
import FormationCard from "../components/FormationCard.vue"

const MapFormations = defineAsyncComponent({
  loader: () => import("../components/MapFormations.vue"),
})

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

    const maploaded = ref(false)

    const cart = ref([])

    const itemPerPages = 10
    let currentPage = ref(0)

    onBeforeMount(() => {
      formations.value = props.formations
    })

    const currentPageFormations = computed(() => {
      let start = currentPage.value * itemPerPages
      let end = start + itemPerPages
      return filteredFormations.value.slice(start, end)
    })

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
          currentPage.value = 0

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

    function pageUp() {
      let maxPage = Math.ceil(filteredFormations.value.length / itemPerPages)
      if (currentPage.value < maxPage - 1) {
        currentPage.value++
      }
    }

    function pageDown() {
      if (currentPage.value > 0) {
        currentPage.value--
      }
    }

    function manageCart(disp) {
      if (cart.value.includes(disp)) {
        const index = cart.value.indexOf(disp)
        cart.value.splice(index, 1)
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
      cart,
      currentPageFormations,
      currentPage,
      pageUp,
      pageDown,
      maploaded,
    }
  },
}
</script>

<template>
  <main>
    <HeaderInformation :cart="cart" />

    <div class="w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto">
      <form
        class="filters flex-col justify-center bg-white w-full mx-auto mt-10 mb-10"
      >
        <div
          class="mx-auto border-space-cadet flex border-2 rounded-lg md:rounded-xl w-full h-12 box-border pl-5 mb-3 overflow-hidden"
        >
          <input
            class="w-11/12 h-5/6 my-auto outline-none text-xl"
            type="text"
            v-model="filterByText"
            placeholder="Rechercher..."
          />
          <FontAwesomeIcon
            class="mr-3 sm:mr-0 h-1/2 my-auto"
            icon="fa-magnifying-glass"
          />
        </div>

        <div class="flex flex-row justify-center space-x-5">
          <div class="flex flex-col space-y-3 w-1/2">
            <div
              class="flex h-12 border-space-cadet border-2 rounded-lg md:rounded-xl justify-between"
            >
              <label class="w-3/5 p-2 text-md lg:text-xl" for="typeFormation"
                >Formation</label
              >
              <select
                class="w-1/3 h-2/3 mr-5 my-auto bg-white"
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
            </div>

            <div
              class="flex h-12 border-space-cadet border-2 rounded-lg md:rounded-xl justify-between"
            >
              <label class="w-3/5 p-2 text-md lg:text-xl" for="Structure"
                >Structure</label
              >
              <select
                class="w-1/3 h-2/3 mr-5 my-auto bg-white"
                name="Structure"
                id="Structure"
                v-model="inputStructure"
              >
                <option value="priv">Privée</option>
                <option ListeFormation value="">Vide</option>
              </select>
            </div>

            <div
              class="flex h-12 border-space-cadet border-2 rounded-lg md:rounded-xl justify-between"
            >
              <label class="w-3/5 p-2 text-md lg:text-xl" for="access"
                >Accès</label
              >
              <select
                class="w-1/3 h-2/3 mr-5 my-auto bg-white"
                name="access"
                id="access"
                v-model="inputAccess"
              >
                <option value="présentiel">Présentiel</option>
                <option value="distanciel">Distanciel</option>
                <option value="distanciel et distanciel">
                  Présentiel ou distanciel
                </option>
                <option value="">Vide</option>
              </select>
            </div>
          </div>

          <div
            class="flex flex-col w-1/2 justify-center space-y-2 border-space-cadet border-2 rounded-lg md:rounded-xl"
          >
            <h2 class="font-bold pl-2 text-center text-2xl">Durée</h2>
            <div class="flex justify-between sm:justify-center h-12 w-full">
              <label
                class="w-1/4 grid place-items-center text-md md:text-xl"
                for="minDuration"
                >Min</label
              >
              <input
                class="w-3/4 sm:w-2/5 h-2/3 mr-5 p-5 my-auto border-space-cadet border-2 outline-none rounded-md md:rounded-xl"
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
            </div>

            <div class="flex justify-center h-12">
              <label
                class="w-1/4 grid place-items-center text-md md:text-xl"
                for="maxDuration"
                >Max</label
              >
              <input
                class="w-3/4 sm:w-2/5 h-2/3 mr-5 p-5 my-auto border-space-cadet border-2 outline-none rounded-md md:rounded-xl"
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
          </div>
        </div>
      </form>

      <div
        class="w-full h-96 mx-auto rounded-xl border-space-cadet border-2 overflow-hidden mb-10"
      >
        <MapFormations v-if="maploaded" :formations="filteredFormations" />
        <div
          v-else
          class="text-center bg-gradient-to-r from-space-cadet via-white to-space-cadet h-full grid place-items-center"
        >
          <button
            class="bg-space-cadet text-white p-5 border-2 rounded-xl text-md font-bold"
            @click="maploaded = !maploaded"
          >
            <FontAwesomeIcon icon="fa-map-location-dot" />

            <span class="ml-2">Load map</span>
          </button>
        </div>
      </div>

      <FormationCard
        v-for="(formation, index) in currentPageFormations"
        :key="index"
        :formation="formation"
        :cart="cart"
        @manageCart="manageCart(formation)"
      />
    </div>

    <div>
      <button @click="pageDown()">-</button>
      <button @click="pageUp()">+</button>
    </div>
  </main>
</template>
