<template>
    <div>
        <Header />
            <h1 class="text-4xl text-red-600">Salut a tous</h1>
        <FooterInformation />
    </div>
</template>


<script>
import FooterInformation from "./components/FooterInformation.vue"
import Header from "./components/HeaderInformation.vue"
export default {
  components: {
    FooterInformation,
    Header
  },
  setup() {

  },
}
</script>