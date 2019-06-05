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
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight">
        <!-- <v-icon>setting</v-icon> -->
        <v-icon>supervised_user_circle</v-icon>
      </v-toolbar-side-icon>
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
    <floatTool />
    <Message />
  </v-app>
</template>

<script>
import rightDrawer from '~/components/admin/navigation-drawer-right'
import leftDrawer from '~/components/admin/navigation-drawer-left'
import floatTool from '~/components/admin/floatTool'
import Message from '~/components/common/Message'
export default {
  components: {
    rightDrawer,
    leftDrawer,
    floatTool,
    Message
  },
  middleware: 'session',
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
