import { createRouter, createWebHistory } from 'vue-router';
import WelcomeLanding from '../components/WelcomeLanding.vue';
import UserSignup from '../components/UserSignup.vue';
import Login from '../components/Login.vue';
import VirtualSimulator from '../components/Simulator.vue';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: WelcomeLanding,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: UserSignup,
    },
    {
        path: '/home',
        name: 'Home',
        component: VirtualSimulator,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
