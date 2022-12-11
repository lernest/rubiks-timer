import Vue from 'vue'
import VueRouter from 'vue-router'
import Timer from '../views/Timer.vue'
import Trainer from '../views/Trainer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Timer',
    component: Timer
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: Trainer
  }
]

const router = new VueRouter({
  routes
})

export default router
