import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faGlobe, faGrip, faEllipsisVertical, faCheck, faBolt, faCircleInfo, faXmark, faPenFancy, faEraser } from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'

library.add(
  faUserSecret,
  faGlobe,
  faGrip,
  faSearchengin,
  faEllipsisVertical,
  faCheck,
  faBolt,
  faCircleInfo,
  faXmark,
  faPenFancy,
  faEraser
)

const app = createApp(App)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
