<script>
import { ref, onBeforeMount, computed } from "vue"

import HeaderInformation from "../components/HeaderInformation.vue"
import MapFormations from "../components/MapFormations.vue"
import FormationCard from "../components/FormationCard.vue"
import FooterInformation from "../components/FooterInformation.vue"

export default {
  name: "HomeView",
  components: {
    HeaderInformation,
    MapFormations,
    FormationCard,
    FooterInformation,
  },
  props: {
    formations: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props) {
    const formations = ref([])
    const filterByText = ref("")
    const inputFormationType = ref("")
    const inputStructure = ref("")
    const inputAccess = ref("")
    const inputBorneInf = ref()
    const inputBorneSup = ref()

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
        const index = cart.value.indexOf(disp)
        cart.value.splice(index, 1)
      } else {
        cart.value.push(disp)
      }

      console.log(cart.value)
    }

    return {
      filteredFormations,
      filterByText,
      inputFormationType,
      inputStructure,
      inputAccess,
      inputBorneInf,
      inputBorneSup,
      cart,
      manageCart,
    }
  },
}
</script>

<template>
  <main>
    <HeaderInformation />

    <form class="filters flex-col justify-center bg-white w-1/2 mx-auto mt-10 mb-10">
			<div  class="mx-auto border-space-cadet flex border-2 rounded-xl w-full h-12 box-border pl-5 mb-3">
				<input class="w-11/12 outline-none text-xl" type="text" v-model="filterByText" placeholder="Rechercher..." />
				<FontAwesomeIcon class="w-1/12 h-1/2 my-auto" icon="fa-magnifying-glass"/>
			</div>

      <div class="flex flex-row justify-center space-x-5">
				<div class="flex flex-col space-y-3">
					<div class="flex border-space-cadet border-2 rounded-xl justify-between">
						<label class="w-3/5 h-12 p-2 text-xl" for="typeFormation">Type de formation</label>
						<select
							class="w-1/5 h-2/3 mr-5 my-auto bg-white"
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
	
					<div class="flex h-12 border-space-cadet border-2 rounded-xl justify-between">
						<label class="w-3/5 p-2 text-xl" for="Structure">Type de structure</label>
						<select class="w-1/5 h-2/3 mr-5 my-auto bg-white" name="Structure" id="Structure" v-model="inputStructure">
							<option value="priv">Privée</option>
							<option ListeFormation value="">Vide</option>
						</select>
					</div>
	
					<div class="flex h-12 border-space-cadet border-2 rounded-xl justify-between">
						<label class="w-3/5 p-2 text-xl" for="access">Type d’accès</label>
						<select class="w-1/5 h-2/3 mr-5 my-auto bg-white" name="access" id="access" v-model="inputAccess">
							<option value="présentiel">Présentiel</option>
							<option value="distanciel">Distanciel</option>
							<option value="distanciel et distanciel">
								Présentiel ou distanciel
							</option>
							<option value="">Vide</option>
						</select>
					</div>
				</div>

				<div class="flex flex-col justify-center space-y-2 border-space-cadet border-2 rounded-xl">
					<h2 class="font-bold pl-2 text-center text-2xl">Durée</h2>
					<div class="flex flex-row h-12 pl-20">
						<label class="w-1/4 grid place-items-center text-xl" for="minDuration">Min</label>
						<input
							class="w-2/5 h-2/3 mr-5 p-5 my-auto border-space-cadet border-2 rounded-xl"
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
	
					<div class="flex flex-row h-12 pl-20">
						<label class="w-1/4 grid place-items-center text-xl" for="maxDuration">Max</label>
						<input
							class="w-2/5 h-2/3 mr-5 p-5 my-auto border-space-cadet border-2 rounded-xl"
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

		<MapFormations 
			:formations="filteredFormations" 
			class="w-1/2 h-96 mx-auto rounded-xl border-space-cadet border-2"
		/>

    <FormationCard
      v-for="(formation, index) in filteredFormations"
      :key="index"
      :formation="formation"
      @manageCart="manageCart(formation)"
    />

    <FooterInformation />
  </main>
</template>
