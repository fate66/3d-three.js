import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import demo from '../views/3d/demo.vue'
import point from '../views/3d/point.vue'
import triangle from '../views/3d/triangle.vue'
import line from '../views/3d/line.vue'
import rect from '../views/3d/rect.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/point',
      name: 'point',
      component: point
    },
    {
      path: '/triangle',
      name: 'triangle',
      component: triangle
    },
    {
      path: '/line',
      name: 'line',
      component: line
    },
    {
      path: '/rect',
      name: 'rect',
      component: rect
    }
  ]
})

export default router
