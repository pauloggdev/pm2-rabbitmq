<template>
  <div class="login">
      <h1>Login</h1>
      <div class="form-login">
            <form>
                <input type="text" v-model="user.email" placeholder="E-mail"/><br><br>
                <input type="email" v-model="user.password" placeholder="password"/><br><br>
                <button @click.prevent="fazerLogin">Login</button>
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data(){
    return{
      user:{
        email:'johndoe@gmail.com',
        password:'123',
      }
    }
  },
  methods:{
    async fazerLogin(){
      try {
        const response = await axios.post(`http://89.116.73.64:4000/login`, this.user);
        if(response.status == 200){
          localStorage.setItem('token', response.data.token);
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        console.log(error)
      }
      
      
    }
  }
}
</script>
