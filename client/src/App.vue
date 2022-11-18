<template>
  <RouterView :formations="formations" />
</template>

<script>
import { ref, onBeforeMount } from "vue"

export default {
  setup() {
    const formations = ref([])

    // Fonction séparée pour fetch les formations
    async function fetchFormations() {
      const endpoint = `${import.meta.env.VITE_API_URL}/formations`

      const response = await fetch(endpoint)
      return response.json()
    }

    onBeforeMount(async () => {
      formations.value = await fetchFormations()
    })

    return { formations }
  },
}
</script>
