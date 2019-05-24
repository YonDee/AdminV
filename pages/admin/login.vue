<template>
  <v-flex class="login">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
      class="animated slideInRight fast"
    >
    login elements
    </v-navigation-drawer>
    <v-container fluid fill-height >
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <h1>AdminV</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
  export default {
    layout: 'clear',
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>

<style lang="stylus" scoped>
@font-face
  font-family 'Quicksand-Bold'
  src url('~assets/fonts/Quicksand-Bold.woff')
  font-style normal
.login
  h1
    font-size 170px
    color #afafaf
    font-family: 'Quicksand-Bold', -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
</style>
