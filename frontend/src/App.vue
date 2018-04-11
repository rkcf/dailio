<template>
  <div id="app">
    <transition name="fade">
      <ModalTaskCreate v-if="$store.state.modalModule === 'create'"/>
    </transition>
    <transition name="fade">
      <ModalTaskDetail v-if="$store.state.modalModule === 'detail'"/>
    </transition>
    <div id="header">
      <h1 id="title">dailio</h1>
    </div>
    <CardContainer/>
  </div>
</template>

<script>
import CardContainer from './components/CardContainer'
import ModalTaskCreate from './components/ModalTaskCreate'
import ModalTaskDetail from './components/ModalTaskDetail'

export default {
  name: 'App',
  components: {
    CardContainer,
    ModalTaskCreate,
    ModalTaskDetail
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
  font-family: 'Raleway', sans-serif;
  color: #0E2B29;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
}

input {
  background: #fff;
  padding: .5Rem;
  border: 1px #ddd solid;
  width: 10rem;
  margin-bottom: 1rem;
}

.btn {
  margin: 0;
  background: #FC913a;
  padding: .5rem;
  text-transform: uppercase;
  border: 1px #FC913a solid;
  color: #fff;
  font-family: 'Raleway';
  font-weight: 600;
  letter-spacing: .15em;
}

button:hover {
  cursor: pointer
}

.input-danger {
  color: #FF6B6B;
}

.fade-leave-active, .fade-enter-active{
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.popin-leave-active, .popin-enter-active {
  transition: all .2s ease-in;
}

.popin-enter, .popin-leave-to {
  opacity: 0;
  transform: scale(2);
  fill: green;
}
</style>
