<template>
  <v-flex>
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
  </v-flex>
</template>

<script>
export default {
  data(){
    return {
      drawer: this.mainVisible,
      left: this.childVisible
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
      this.drawer = val
    },
    childVisible(val){
      this.left = val
    },
  }
}
</script>

<style>

</style>
