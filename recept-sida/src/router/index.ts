import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import RecipeDetails from '../views/RecipeDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
  {
    path: '/recipe/:id', // Dynamic route for recipe details
    name: 'RecipeDetails',
    component: RecipeDetails,
    props: true, // Enable passing route parameters as props to the component
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
