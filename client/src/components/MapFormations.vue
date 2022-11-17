<template>
  <div id="mapid" class="h-full"></div>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated } from "vue"
import "leaflet/dist/leaflet.css"
import leaflet from "leaflet"

import leafletIconUrl from "../assets/location-pin.svg"

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
		let layerGroup

		const myIcon = L.icon({iconUrl: leafletIconUrl, iconSize: [19, 47.5]})


    onMounted(() => {
      loadMap()
			initLayerGroup()
      mark()
    })

		onBeforeMount(() => {
			console.log("before mount")
		})

		onUpdated(() => {
			layerGroup.clearLayers()
			formations = props.formations
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

		function initLayerGroup() {
			layerGroup = L.layerGroup()
			map.addLayer(layerGroup)
			return layerGroup
		}

    function addMarker(formation) {
      let marker = L.marker(formation.structCoords, {icon: myIcon})
      marker.bindPopup(formation.formationName)
      layerGroup.addLayer(marker)
    }
  },
}
</script>
