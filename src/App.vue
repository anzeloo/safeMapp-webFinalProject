<template>
  <div id="app">
    <div id="nav">
      <Navigation />
    </div>
    <!--
    <div id="login">
      <Login/>
    </div>
    -->
    <router-view/>
  </div>
</template>

<script>
//import Login from './components/Login';
import Navigation from '@/components/layout/Navigation'

export default {
  components: {
    //Login
    Navigation
  }

 
};
</script>

<style lang="scss">
  //@import './assets/App.scss';
  @import './scss/App.scss';
</style>
