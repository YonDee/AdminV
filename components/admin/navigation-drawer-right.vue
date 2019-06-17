<template>
<v-flex>
  <v-navigation-drawer
    v-model="drawerRight"
    fixed
    right
    clipped
    app
  >
    <v-list dense>
      <v-list-tile @click.stop="right = !right">
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title >USER INFORMATION</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="logout()">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title >LOG OUT</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="right"
    right
    temporary
    fixed
  >
    <div class="user-information">
      <v-avatar
        :size="100"
        color="grey lighten-4"
      >
        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
      </v-avatar>
      <h2>{{ $store.state.user.data.name }}</h2>
      <p>Email: {{ $store.state.user.data.email }}</p>
      <p>account: {{ $store.state.user.data.account }}</p>
    </div>
  </v-navigation-drawer>
</v-flex>
</template>

<script>
export default {
  data(){
    return {
      drawerRight: this.mainVisible,
      right: this.childVisible
    }
  },
  props: {
    mainVisible: {
      type: Boolean,
      default: false
    },
    childVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    mainVisible(val){
      this.drawerRight = val
    },
    childVisible(val){
      this.right = val
    },
  },
  methods: {
    logout(){
      this.$axios.post('/api/session/logout')
        .then(response => {
          this.$store.commit('setUser', '')
          this.$router.push('/admin/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-information
  width 100%
  display flex
  justify-content center
  align-items center
  flex-direction column
  padding 15px
  h2
    margin-top 20px
  p
    margin-bottom 0
</style>
