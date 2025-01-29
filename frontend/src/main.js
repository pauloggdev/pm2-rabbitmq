import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios';


Vue.config.productionTip = false


// Configura Axios para capturar erro 401
// axios.interceptors.response.use(
//   response => response, // Se a resposta for sucesso, continue normalmente
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Redirecionar para a página de "não autorizado"
//       router.push({ name: 'NotAuthorized' }); // Ou qualquer outra página
//     }
//     return Promise.reject(error); // Rejeitar o erro para ser tratado onde foi solicitado
//   }
// );

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
