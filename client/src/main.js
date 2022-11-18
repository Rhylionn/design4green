import { createApp } from "vue"
import "./index.css"
import router from "./router/index"
import App from "./App.vue"
import { createPinia } from "pinia"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import {
  faCartShopping,
  faCaretDown,
  faCirclePlus,
  faCircleMinus,
  faCaretUp,
  faMagnifyingGlass,
  faMapLocationDot,
  faCircleRight,
  faCircleLeft
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faCartShopping,
  faCaretDown,
  faCirclePlus,
  faCircleMinus,
  faCaretUp,
  faMagnifyingGlass,
  faMapLocationDot,
  faCircleRight,
  faCircleLeft
)

const app = createApp(App)
const pinia = createPinia()

app.component("FontAwesomeIcon", FontAwesomeIcon)
app.use(router)
app.use(pinia)

app.mount("#app")
