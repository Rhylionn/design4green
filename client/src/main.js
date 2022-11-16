import { createApp } from "vue"
import "./index.css"
import App from "./App.vue"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import {
  faCartShopping,
  faCaretDown,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons"

library.add(faCartShopping, faCaretDown, faCirclePlus, faCircleMinus)

const app = createApp(App)
app.component("FontAwesomeIcon", FontAwesomeIcon)

app.mount("#app")
