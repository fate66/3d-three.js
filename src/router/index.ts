import type { Router } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/3d/demo/demo.vue')
    },
    {
      path: '/point',
      name: 'point',
      component: () => import('@/views/3d/demo/point.vue')
    },
    {
      path: '/triangle',
      name: 'triangle',
      component: () => import('@/views/3d/demo/triangle.vue')
    },
    {
      path: '/line',
      name: 'line',
      component: () => import('@/views/3d/demo/line.vue')
    },
    {
      path: '/rect',
      name: 'rect',
      component: () => import('@/views/3d/demo/rect.vue')
    },
    {
      path: '/rectNormal',
      name: 'rectNormal',
      component: () => import('@/views/3d/demo/rectNormal.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/3d/demo/test.vue')
    },
    {
      path: '/world',
      name: 'world',
      component: () => import('@/views/3d/case/world.vue')
    },
    {
      path: '/triangle2',
      name: 'triangle2',
      component: () => import('@/views/3d/case/triangle.vue')
    },
    {
      path: '/shadow',
      name: 'shadow',
      component: () => import('@/views/3d/case/shadow.vue')
    },
    {
      path: '/star',
      name: 'star',
      component: () => import('@/views/3d/case/star.vue')
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('@/views/3d/case/points.vue')
    },
    {
      path: '/ball',
      name: 'ball',
      component: () => import('@/views/3d/case/ball.vue')
    }
  ]
})

export default router
