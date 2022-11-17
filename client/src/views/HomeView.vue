<template>
  <MapFormations :formations="formations" />
</template>

<script>
import { ref, onBeforeMount, onUpdated, onMounted } from "vue"
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

    onBeforeMount(() => {
      formations.value = props.formations
    })

    return { formations }
  },
}
</script>
