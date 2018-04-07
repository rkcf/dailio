<template>
  <div id="app">
    <div id="header">
      <h1 id="title">dailio</h1>
    </div>
    <CardContainer/>
    <transition name="fade">
      <ModalContainer v-show="$store.state.modalModule"/>
    </transition>
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
  computed: {
    showModal () {
      return this.$store.state.showModal
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

input {
  background: #fff;
  padding: .5Rem;
  border: 1px #ddd solid;
  width: 10rem;
}

.btn {
  margin: 0;
  background: #FC913a;
  padding: .5rem;
  text-transform: uppercase;
  border: 1px #FC913a solid;
}

button:hover {
  cursor: pointer
}

.fade-leave-active, .fade-enter-active{
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.input-danger {
  color: #FF6B6B;
  padding-top: 1rem;
}

</style>
