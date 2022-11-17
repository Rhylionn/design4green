<template>
  <RouterView :formations="formations" />
</template>

<script>
import { ref, onBeforeMount } from "vue"

export default {
  name: "App",
  setup() {
    const formations = ref([])

    onBeforeMount(async () => {
      formations.value = await getFormations()
    })

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

    async function fetchFormations() {
      const endpoint = `${import.meta.env.VITE_API_URL}/formations`

      const response = await fetch(endpoint)
      return response.json()
    }

    onBeforeMount(async () => {
      formations.value = await getFormations()
    })

    return { formations }
  },
}
</script>
