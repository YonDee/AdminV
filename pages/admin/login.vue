<template>
  <v-layout class="login">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
      clipped
      :class="animateShow"
    >
    <v-layout align-center justify-center column>
      <v-tabs
        v-model="model"
      >
        <v-tab
          v-for="(item,i) in ['Sign in','Sign up']"
          :key="i"
          :href="`#tab-${i+1}`"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-layout>

    <v-tabs-items style="padding: 20px; overflow: hidden" v-model="model"  @keyup.native.enter="model == 'tab-1' ? login() : register()">
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="`tab-${i}`"
      >
        <v-card flat >
          <v-form ref="user">
            <v-text-field
              v-model="user.account"
              :label="i == 1 ? 'Account / E-mail' : 'Account' "
              :error-messages="isUnique.account || accountErrors "
              @blur="$v.user.account.$touch()"
              required
            ></v-text-field>
            <v-flex v-if="i == 2">
            <v-text-field
              v-model="user.email"
              label="Email"
              :error-messages="isUnique.email || emailErrors"
              @blur="$v.user.email.$touch()"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.name"
              :counter="10"
              label="Name"
              :error-messages="nameErrors"
              @input="$v.user.name.$touch()"
              @blur="$v.user.name.$touch()"
              required
            ></v-text-field>
            </v-flex>
            <v-text-field
              v-model="user.password"
              :error-messages = "passwordErrors"
              @input="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.confirm_password"
              label="Confirm Password"
              :error-messages = "confirm_passwordErrors"
              @blur="$v.user.confirm_password.$touch()"
              type="password"
              v-if="i == 2"
              required
            ></v-text-field>
            <v-layout align-center justify-center row style="margin-top: 20px">
              <v-btn v-if="i == 1" @click="login()">Login</v-btn>
              <v-btn v-if="i == 2" @click="register()">Register</v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-navigation-drawer>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <h1 :class="logoShow">AdminV</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
  import _ from 'underscore'
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
    layout: 'clear',
    data: () => ({
      drawer: false,
      animateShow: '',
      logoShow: '',
      model: 'tab-1',
      user:{
        name: '',
        account: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      isUnique: {
        account: '',
        email: ''
      }
    }),
    methods: {
      login(userData){
        const user = userData || this.user
        this.$axios.post('/api/session/login', user)
          .then(res => {
            this.$store.commit('snackbar/Message', { type: 'success', message: 'Login success' })
            this.drawer = false
            this.animateShow = 'animated slideOutRight fast'
            this.logoShow = 'animated slideOutRight delay-1s'
            this.$store.commit('setUser', res.data)
            setTimeout(() => {
              this.$router.push({ path: '/admin' })
            }, 1500);
          })
          .catch(error => {
            this.$store.commit('snackbar/Message', { type: 'warning', message: error.response.data || 'Submit invalid' })
          })
      },
      register(){
        this.$v.$touch()
        if(!this.$v.$invalid){
          this.$axios.post('/api/user/create', this.user)
            .then(response => {
              this.$store.commit('snackbar/Message', { type: 'success', message: 'Register successful' })
              this.login(this.user)
              return
            })
            .catch(error => {
              console.log(error)
            })
        }
        this.$store.commit('snackbar/Message', { type: 'warning', message: 'Submit invalid.' })
      },
      // is_unique
      checkIsUnique: _.debounce(
      function(val, key){
        this.isUnique[key] = ''
        if(val){
          this.$axios.post('/api/user/is_unique', { [key]: val })
            .then(response => {
              return true
            })
            .catch(error => {
              this.isUnique[key] = 'Duplicate ' + key
              return
            })
        }
      },300),
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
      'user.account'(val){
        this.model == 'tab-1' || this.checkIsUnique(val,'account')
      },
      'user.email'(val){
        this.model == 'tab-1' || this.checkIsUnique(val,'email')
      },
      model(val){
        if(val == 'tab-2'){
          this.checkIsUnique(this.user.account,'account')
          setTimeout(() => {
            this.checkIsUnique(this.user.email,'email')
          }, 1000);
        }else{
          this.isUnique = {
            account: '',
            email: '',
          }
        }
      }
    },
    mounted(){
      if(this.$store.state.user){
        this.$router.push({ path: '/admin' })
      }
      this.drawer = true
      this.animateShow = 'animated slideInRight fast'
    }
  }
</script>

<style lang="stylus" scoped>
@font-face
  font-family 'GloriaHallelujah'
  src url('~assets/fonts/GloriaHallelujah.woff')
  font-style normal
.login
  h1
    font-size 170px
    color #6f6f6f
    margin-top -5%
    font-family: 'GloriaHallelujah', -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
</style>
