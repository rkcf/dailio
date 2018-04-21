<template>
  <div id="app">
    <transition name="fade">
      <ModalTaskCreate v-if="$store.state.modalModule === 'create'"/>
    </transition>
    <transition name="fade">
      <ModalTaskDetail v-if="$store.state.modalModule === 'detail'"/>
    </transition>
    <transition name="fade">
      <ModalLogin v-if="$store.state.authToken === ''"/>
    </transition>
    <div id="header" class="raised">
      <h1 id="title">dailio</h1>
    </div>
    <CardContainer v-if="$store.state.authToken !== ''"/>
  </div>
</template>

<script>
import CardContainer from './components/CardContainer'
import ModalTaskCreate from './components/ModalTaskCreate'
import ModalTaskDetail from './components/ModalTaskDetail'
import ModalLogin from './components/ModalLogin'

export default {
  name: 'App',
  components: {
    CardContainer,
    ModalTaskCreate,
    ModalTaskDetail,
    ModalLogin
  },
  created () {
    const token = sessionStorage.getItem('token')
    if (token) {
      this.$store.commit('setAuthToken', token)
    }
  },
  computed: {
    showModal () {
      return this.$store.state.showModal
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Raleway';
  src: url('/static/fonts/Raleway-Regular.woff') format('woff');
}

#header {
  background-color: #DCF4F3;
  grid-column: 1 / 6;
  padding-left: 2.5rem;
}

#app {
  font-family: 'Raleway', sans-serif;
  color: #0E2B29;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
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
  border: 1px #FC913a solid;
  color: #fff;
  font-weight: 400;
  letter-spacing: .15em;
}

button {
  border: none;
  background: none;
}

button:hover {
  cursor: pointer
}

.input-danger {
  color: #FF6B6B;
}

.raised {
  box-shadow: 1px 2px 3px #ccc;
  transition: transform .3s ease;
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
