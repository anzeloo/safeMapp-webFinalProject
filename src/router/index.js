import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'


Vue.use(Router)

const router = new Router({
    routes: [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
            ]
});

export default router;