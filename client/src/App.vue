<template>
    <ListeFormations v-for="(formation,index) in formations" :key="index" :formation="formation"/>
    </template>

<script>
import { ref, onBeforeMount } from "vue"
import ListeFormations from "./components/ListeFormations.vue"

const cart = ref([])
export { cart }

export default {
    data () {
        return {
            cart
        }
    },
    name: "App",
    components: { 
        ListeFormations 
    },
    setup() {
        const formations = ref([]);
        onBeforeMount(async () => {
            formations.value = await getFormations();
        });
        // Récupère les formations soit par le localStorage soit en fetchant l’API
        async function getFormations() {
            let formations;
            if (localStorage.getItem("formations") === null) {
                formations = await fetchFormations();
                localStorage.setItem("formations", JSON.stringify(formations));
            }
            else {
                formations = JSON.parse(localStorage.getItem("formations"));
            }
            return formations;
        }
        // Fonction séparée pour fetch les formations
        async function fetchFormations() {
            const endpoint = `${import.meta.env.VITE_API_URL}/formations`;
            const response = await fetch(endpoint);
            return response.json();
        }
        return {formations}
    },
}
</script>
