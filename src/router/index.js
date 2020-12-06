import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Mapa from '../components/Mapa.vue'
import Mapasolovista from '../components/Mapasolovista.vue'
import Perfil from '../components/Perfil.vue'
import firebase from 'firebase'


Vue.use(Router)

const router = new Router({
    routes: [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/mapa',
        name: 'mapa',
        component: Mapa
    },
    {
      path: '/mapasolovista',
      name: 'mapasolovista',
      component: Mapasolovista
  },
    {
        path: '/perfil',
        name: 'perfil',
        component: Perfil,
        props: true,
        meta: {
          requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
      const user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next({
          name: 'login'
        })
      }
    } else {
      next();
    }
})

export default router;