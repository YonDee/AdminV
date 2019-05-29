<template>
  <v-app id="inspire">
    <v-toolbar
      color="primary"
      dark
      fixed
      app
      clipped-right
      class="animated slideInDown fast"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>AdminV</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <leftDrawer
     :mainVisible="drawer"
     :childVisible="left"/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <Nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <rightDrawer
     :mainVisible="drawerRight"
     :childVisible="right"/>
    <v-footer color="primary" class="white--text animated slideInUp fast" app>
      <a href="https://github.com/YonDee" target="_blank">@YonDee</a>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import rightDrawer from '~/components/admin/navigation-drawer-right'
import leftDrawer from '~/components/admin/navigation-drawer-left'
export default {
  components: {
    rightDrawer,
    leftDrawer
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
