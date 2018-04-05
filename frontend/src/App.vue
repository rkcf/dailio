<template>
  <div id="app">
    <div id="header">
      <h1 id="title">dailio</h1>
    </div>
    <CardContainer v-on:openModal="showModal = true"/>
    <ModalContainer v-if="showModal" v-on:closeModal="showModal = false"/>
  </div>
</template>

<script>
import CardContainer from './components/CardContainer'
import ModalContainer from './components/ModalContainer'

export default {
  name: 'App',
  components: {
    CardContainer,
    ModalContainer
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

#header {
  background-color: #DCF4F3;
  grid-column: 1 / 6;
  padding: 1.5rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #0E2B29;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
}
</style>
