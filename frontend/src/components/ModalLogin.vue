<template>
  <ModalContainer v-on:close="close">
    <div id="modal-body">
      <h2>login</h2>
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
      </form>
      <transition name="fade">
        <div class="input-danger" v-show="loginError">
          <p>{{ loginError }}</p>
        </div>
      </transition>
      <transition name="fade">
        <div class="input-danger" v-show="errors.has('username')">
          <p>{{ errors.first('username') }}</p>
        </div>
      </transition>
      <transition name="fade">
        <div class="input-danger" v-show="errors.has('password')">
          <p>{{ errors.first('password') }}</p>
        </div>
      </transition>
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
  computed: {
    loginError () {
      return this.$store.getters.loginError
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

#modal-body h2 {
  margin-top: 0;
}
</style>
