<template>
  <v-flex class="login">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
      class="animated slideInRight fast"
    >
    <v-layout align-center justify-center column>
      <v-tabs
        v-model="model"
      >
        <v-tab
          v-for="i in 2"
          :key="i"
          :href="`#tab-${i}`"
        >
          Item {{ i }}
        </v-tab>
      </v-tabs>
    </v-layout>

    <v-tabs-items style="padding: 20px" v-model="model">
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="`tab-${i}`"
      >
        <v-card flat >
          <v-text-field
            v-model="account"
            :counter="10"
            label="Account / E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="10"
            label="password"
            type="password"
            required
          ></v-text-field>
          <v-layout align-center justify-center row>
            <v-btn>Login</v-btn>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
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
      drawer: null,
      model: 'tab-1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      name: ''
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
