<template>
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>login</h2>
    </div>
    <div id="modal-body">
      <form v-on:submit.prevent="validateLogin(username, password)">
        <input
          v-validate="'required'"
          placeholder="username"
          v-model="username"
          name="username"
        ><br />
        <input
          v-validate="'required'"
          placeholder="password"
          v-model="password"
          name="password"
          type="password"
        ><br />
        <button class="btn">login</button>
        <transition name="fade">
          <div class="input-danger" v-show="errors.has('username')">
            {{ errors.first('username') }}
          </div>
        </transition>
        <transition name="fade">
          <div class="input-danger" v-show="errors.has('password')">
            {{ errors.first('password') }}
          </div>
        </transition>
      </form>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from './ModalContainer'

export default {
  name: 'ModalLogin',
  components: {
    ModalContainer
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    validateLogin: function (username, password) {
      // Check if the task name is valid before creating
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('login', {'username': username, 'password': password})
        }
      })
    },
    clearForm: function () {
      // Clear out the form and reset the validator
      this.username = ''
      this.password = ''
      this.$validator.reset()
    },
    close: function () {
      // Close out the modal
      this.clearForm()
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
#modal-body  {
  text-align: center;
}
#modal-header {
  text-align: center;
}
</style>
