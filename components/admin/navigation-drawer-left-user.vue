<template>
<div class="users-manager-body">
  <div class="pop-tools animated slideInDown faster" v-show="left">
    <v-btn fab small color="white" @click="$emit('closeUserManager')">
      <v-icon >keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn fab small color="white">
      <v-icon @click="userCreate()">add</v-icon>
    </v-btn>
    <v-btn fab small color="white" disabled>
      <v-icon >search</v-icon>
    </v-btn>
  </div>
  <v-navigation-drawer
    v-model="left"
    temporary
    fixed
    stateless
  >
    <v-list-tile style="border-bottom: 1px solid #ccc">
      <v-list-tile-action>
        <v-icon>account_box</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          <h3>USER</h3>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list two-line subheader v-if="!userInfoVisible" class="animated slideInDown faster users-list">
      <v-list-tile v-for="item in users" :key="item.title" @click="userVisible(item)">
        <v-list-tile-avatar>
          <v-icon class="blue white--text">{{ item.avatar || 'account_circle' }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title><strong>{{ item.name }}</strong> ({{ item.account }})</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-flex style="border-bottom: 1px solid #ccc; padding: 10px" class="animated zoomIn faster" v-else>
      <v-text-field
      v-model="user.name"
      label="Name"
      :counter="10"
      :error-messages="nameErrors"
      @input="$v.user.name.$touch()"
      @blur="$v.user.name.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.account"
      :error-messages="accountErrors"
      label="Account"
      @blur="$v.user.account.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.email"
      label="Email"
      :error-messages="emailErrors"
      @blur="$v.user.email.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.password"
      :error-messages = "passwordErrors"
      @input="$v.user.password.$touch()"
      @blur="$v.user.password.$touch()"
      type="password"
      label="Password"
      :counter="20"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.confirm_password"
      :error-messages = "confirm_passwordErrors"
      @blur="$v.user.confirm_password.$touch()"
      validate-on-blur
      type="password"
      label="Confirm Password"
      clearable
      required>
      </v-text-field>
      <v-layout align-center justify-center row>
        <v-btn @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
        <v-btn @click="userInfoVisible = !userInfoVisible">Back</v-btn>
      </v-layout>
    </v-flex>
  </v-navigation-drawer>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    user: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      account: { required },
      password: { required, maxLength: maxLength(20) },
      confirm_password: { required, sameAsPassword: sameAs('password')  }
    },
  },
  data(){
    return {
      loader: null,
      loading: false,
      left: this.mainVisible,
      userInfoVisible: false,
      user: {},
      users: []
    }
  },
  props:{
    mainVisible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.user.name.$dirty) return errors
      !this.$v.user.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.user.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('Must be valid e-mail')
      !this.$v.user.email.required && errors.push('E-mail is required')
      return errors
    },
    accountErrors () {
      const errors = []
      if (!this.$v.user.account.$dirty) return errors
      !this.$v.user.account.required && errors.push('Account is required')
      return errors
    },
    passwordErrors (){
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.required && errors.push('Password is required')
      return errors
    },
    confirm_passwordErrors (){
      const errors = []
      if (!this.$v.user.confirm_password.$dirty) return errors
      !this.$v.user.confirm_password.sameAsPassword && errors.push('Inconsistent password input twice.')
      !this.$v.user.confirm_password.required && errors.push('Confirm password is required')
      return errors
    },
  },
  watch: {
    mainVisible(val){
      this.left = val
      if(this.left && this.users == ''){
        this.$axios.post('/api/user/index')
          .then(response => {
            this.users = response.data.rows.map(item => {
              item.password = ''
              return item
            })
          })
          .catch(error => {
            this.$store.commit('snackbar/Message', { type: 'warning', meesage: error.response.data })
          })
      }
    },
    loader(){
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => {
          this[l] = false
          this.userInfoVisible = false
        }, 3000)
        this.loader = null
    }
  },
  methods: {
    userVisible(user){
      if(user){
        this.userInfoVisible = true
        this.user = user
      }
    },
    userCreate(user){
      this.userInfoVisible = true
      this.user = {
        id: '',
        name: '',
        account: '',
        email: '',
        password: ''
      }
    },
    // submit
    submit(){
      this.loader = 'loading'
      this.$v.$touch()
      if(this.$v.$invalid){
        this.$store.commit('snackbar/Message', {
          type: 'warning',
          message: 'Submit error'
        })
      }else{
        let postUrl
        postUrl = this.user.id ? '/api/user/update' : '/api/user/create'
        this.$axios.post(postUrl, this.user)
          .then(res => {
            this.$store.commit('snackbar/Message', {
              type: 'success',
              message: 'Submit success!'
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.users-manager-body
  position relative
  width 300px
  .pop-tools
    position absolute
    right -60px
    z-index 99
    display flex
    flex-direction column
    justify-content center
    align-items center
.users-list
  height 90vh
  overflow auto
  border-bottom 1px solid #ccc
</style>
