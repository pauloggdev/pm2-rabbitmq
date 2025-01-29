import Vue from 'vue'//-
import VueRouter from 'vue-router'



// Importe os componentes para as rotas
import Candidatura from '@/components/Candidatura.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import NotAuthorized from '@/components/NotAuthorized.vue'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Verifica se o token está no localStorage
  if (!isAuthenticated) {
    next({ name: 'Login' });
  } else {
    // Se autenticado, permite a navegação
    next();
  }
};

const isAuthenticated = (to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated =!!token; 
  if (isAuthenticated) {
    next({ name: 'Home' });
  } else {
    // Se não autenticado, permite a navegação
    next();
  }
}

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/candidatura',
    name: 'Candidatura',
    component: Candidatura
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter:isAuthenticated
  },
  {
    path: '/nao-autorizado',
    name: 'NotAuthorized',
    component: NotAuthorized // Nova rota para página "Não Autorizado"
  }
]

// Cria a instância do roteador
const router = new VueRouter({
  mode: 'history', // Remove o hash da URL
  routes
})

export default router
