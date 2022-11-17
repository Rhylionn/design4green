import { createApp } from "vue"
import "./index.css"
import router from "./router/index"
import App from "./App.vue"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import {
  faCartShopping,
  faCaretDown,
  faCirclePlus,
  faCircleMinus,
  faCaretUp
} from "@fortawesome/free-solid-svg-icons"

library.add(faCartShopping, faCaretDown, faCirclePlus, faCircleMinus, faCaretUp)

const app = createApp(App)
app.component("FontAwesomeIcon", FontAwesomeIcon)
app.use(router)

app.mount("#app")
