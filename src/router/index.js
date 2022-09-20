import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: () => import('../views/NoteList.vue')
  },
  {
    path: '/note-config/:id',
    name: 'NoteConfig',
    component: () => import('../views/NoteConfig.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
