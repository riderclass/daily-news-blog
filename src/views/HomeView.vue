<template>
  <div class="home">
    <img width="300" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Daily news blog"/>
   <a href="mailto:vladimirrepin.it@gmail.com" uk-icon="icon: mail">vladimirrepin.it@gmail.com</a>
  <span uk-icon="heart"></span>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
