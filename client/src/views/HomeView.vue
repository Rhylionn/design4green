<script>
import { ref, onBeforeMount, computed  } from "vue"
import MapFormations from "../components/MapFormations.vue"
export default {
  name: "HomeView",
  components: {
    MapFormations,
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

		const filteredFormations = computed(() => {
			return formations.value.filter((formation) => {
				if(filterByText.value != ""){
					if(formation.hasOwnProperty("formationName") && formation.formationName.includes(filterByText.value)){
						return true
					} else {
						return false
					}
				} else {
					return true 
				}
			})
		})

    onBeforeMount(() => {
      formations.value = props.formations
    })

    return { filteredFormations, filterByText }
  },
}
</script>

<template>
	<main>
		<input type="text" v-model="filterByText" />{{filterByText}}
  	<MapFormations :formations="filteredFormations" />
		{{filteredFormations}}
	</main>
</template>


