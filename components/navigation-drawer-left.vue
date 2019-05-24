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
              <h3>用户管理</h3>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed
    >
      <v-list-tile style="border-bottom: 1px solid #ccc">
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <h3>用户管理</h3>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list two-line subheader v-if="!userInfoVisible" style="border-bottom: 1px solid #ccc">
        <v-list-tile v-for="item in items2" :key="item.title" @click="userInfoVisible = !userInfoVisible">
          <v-list-tile-avatar>
            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title><strong>{{ item.name }}</strong> ({{ item.account }})</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-layout align-center justify-center row>
          <v-btn>创建用户</v-btn>
          <v-btn @click="left = !left">返回</v-btn>
        </v-layout>
      </v-list>
      <v-list style="border-bottom: 1px solid #ccc" v-else>
        123213
        <v-btn @click="userInfoVisible = !userInfoVisible">back</v-btn>
      </v-list>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
export default {
  data(){
    return {
      drawer: this.mainVisible,
      left: this.childVisible,
      userInfoVisible: false,
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', account: 'user1', name: 'Jack', subtitle: 'user1@mail.com' },
        { icon: 'call_to_action', iconClass: 'amber white--text', account: 'user2', name: 'Mona', subtitle: 'user2@mail.com' }
      ]
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

<style lang="stylus" scoped>
h1, h2, h3, h4
  font-weight 300
</style>
