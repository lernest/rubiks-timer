import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar as faStarSolid, faPenToSquare as faPenToSquareSolid } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faStar, faPenToSquare, faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add([faTrashCan, faStar, faCheckCircle, faCircleXmark, faPenToSquare, faStarSolid, faPenToSquareSolid])

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
