import { createRouter, createWebHistory } from 'vue-router'

const a: Storage = localStorage
const router: A = createRouter({
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
      path: '/base',
      name: 'base',
      component: () => import('@/views/3d/base.vue')
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
    },
    {
      path: '/shader',
      name: 'shader',
      component: () => import('@/views/3d/case/shader.vue')
    },
    {
      path: '/scene',
      name: 'scene',
      component: () => import('@/views/scene/scene.vue')
    },
    {
      path: '/stereoCamera',
      name: 'stereoCamera',
      component: () => import('@/views/3d/demo/stereoCamera.vue')
    },
    {
      path: '/fly',
      name: 'fly',
      component: () => import('@/views/3d/demo/fly.vue')
    },
    {
      path: '/granary',
      name: 'granary',
      component: () => import('@/views/granary/index.vue')
    }
  ]
})

export default router
