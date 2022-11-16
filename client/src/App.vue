<template>
  <RouterView :formations="formations" />
</template>

<script>
import { ref, onBeforeMount } from "vue"

export default {
  setup() {
    const formations = ref([])

    async function fetchFormations() {
      const endpoint = `${import.meta.env.VITE_API_URL}/formations`

      const response = await fetch(endpoint)
      return response.json()
    }

    async function getFormations() {
      let formationsRequest
      if (localStorage.getItem("formations") === null) {
        formationsRequest = await fetchFormations()
        localStorage.setItem("formations", JSON.stringify(formationsRequest))
      } else {
        formationsRequest = JSON.parse(localStorage.getItem("formations"))
      }

      return formationsRequest
    }

    onBeforeMount(async () => {
      formations.value = await getFormations()
      console.log(formations.value)
    })

    return { formations }
  },
}
</script>
