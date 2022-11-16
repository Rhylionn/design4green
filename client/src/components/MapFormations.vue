<template>
  <div id="mapid" class="min-h-screen min-w-full"></div>
</template>

<script>
import { onBeforeMount, onMounted, toHandlers } from "vue"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default {
  name: "MapFormations",
  props: {
    formations: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    let map
    let formations = props.formations

    onMounted(() => {
      loadMap()
      mark()
    })

    function mark() {
      formations.forEach((formation) => {
        if (formation.structCoords != undefined) {
          addMarker(formation)
        }
      })
    }

    function loadMap() {
      map = L.map("mapid", {
        attributionControl: false,
      }).setView([46.2276, 2.2137], 6)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 6,
      }).addTo(map)
    }

    function addMarker(formation) {
      let marker = L.marker(formation.structCoords)
      marker.bindPopup(formation.formationName)
      marker.addTo(map)
    }
  },
}
</script>
