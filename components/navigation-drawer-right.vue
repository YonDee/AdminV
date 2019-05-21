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
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="right"
    right
    temporary
    fixed
  ></v-navigation-drawer>
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
  }
}
</script>

<style>

</style>
