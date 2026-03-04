import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: HomeView 
    },
    {
        path: '/:pathMatch(.*)*',  // ← CATCH-ALL (LAST)
        name: 'NotFound',
        component: NotFoundView
  }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})