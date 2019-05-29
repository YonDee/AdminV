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

    <v-tabs-items style="padding: 20px;" v-model="model"  @keyup.native.enter="login">
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="`tab-${i}`"
      >
        <v-card flat >
          <v-text-field
            v-model="user.account"
            :label="i == 1 ? 'Account / E-mail' : 'Account' "
            required
          ></v-text-field>
          <v-flex v-if="i == 2">
          <v-text-field
            v-model="user.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
          </v-flex>
          <v-text-field
            v-model="user.password"
            :counter="10"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirm_password"
            :counter="10"
            label="Confirm Password"
            type="password"
            v-if="i == 2"
            required
          ></v-text-field>
          <v-layout align-center justify-center row>
            <v-btn v-if="i == 1" @click="login()">Login</v-btn>
            <v-btn v-if="i == 2">Register</v-btn>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-navigation-drawer>
    <v-container fluid fill-height >
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <h1 :class="logoShow">AdminV</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
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
      }
    }),
    methods: {
      login(){
        this.$axios.post('http://127.0.0.1:3000/api/session/login', this.user)
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
            this.$store.commit('snackbar/Message', { type: 'warning', message: 'The account password is incorrect or does not exist.' })
          })
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
