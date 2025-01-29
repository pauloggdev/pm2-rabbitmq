<template>
  <div id="app">
      <Menu/>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

  </div>
</template>
<script>
import Menu from './components/Menu';

export default {
  name: 'App',
  components:{
    Menu
  },
  data() {
    return {
      students: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em <2.1.8 */ {
  opacity: 0;
}
</style>
