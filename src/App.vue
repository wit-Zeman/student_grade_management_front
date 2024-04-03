<template>
  <Header/>
  <Main/>
  <Aside/>
</template>

<script>
import Header from './components/units/Header.vue';
import Aside from './components/units/Aside.vue';
import Main from './components/units/Main.vue'

export default {
  components: {
    Header,
    Aside,
    Main
  }
}
</script>

<style>

</style>