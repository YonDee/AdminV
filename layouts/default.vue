<template>
  <v-app id="inspire">
    <v-toolbar
      color="#d43f3a"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>AdminV</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed
    ></v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <Nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <rightDrawer
     :mainVisible="drawerRight"
     :rightVisible="right"/>
    <v-footer color="#d43f3a" class="white--text" app>
      <a href="https://github.com/YonDee" target="_blank">@YonDee</a>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import rightDrawer from '~/components/navigation-drawer-right'
export default {
  components: {
    rightDrawer
  },
  data: () => ({
    drawer: false,
    drawerRight: false,
    right: false,
    left: false
  }),
  props: {
    source: String
  }
}
</script>

<style lang="stylus">
footer
  padding-left 10px
  padding-right 10px
  a
    color #fff
</style>
