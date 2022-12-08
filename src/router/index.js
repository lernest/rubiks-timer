import Vue from 'vue'
import VueRouter from 'vue-router'
import FullCube from '../views/FullCube.vue'
import Trainer from '../views/Trainer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'FullCube',
    component: FullCube
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
