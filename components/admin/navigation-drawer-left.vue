<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/admin">
          <v-list-tile-action>
            <v-icon>laptop_mac</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <h3>HOME</h3>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <h3>USER</h3>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <User
      :mainVisible="left"
      @closeUserManager="closeUserManager()"/>
  </v-flex>
</template>

<script>
import User from "~/components/admin/navigation-drawer-left-user"
export default {
  props: {
    mainVisible: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      drawer: this.mainVisible,
      left: false,
    }
  },
  components: {
    User
  },
  watch: {
    mainVisible(val){
      this.drawer = val
    }
  },
  methods: {
    // close user manager
    closeUserManager(){
      this.left = !this.left
    },
  },
}
</script>

<style lang="stylus" scoped>
h1, h2, h3, h4
  font-weight 300
</style>
