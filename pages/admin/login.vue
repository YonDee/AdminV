<template>
  <v-flex class="login">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
      class="animated slideInRight"
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
.login
  h1
    font-size 150px
    color #9c9c9c
</style>
