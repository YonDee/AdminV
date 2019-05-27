<template>
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
      <v-list-tile v-for="item in items2" :key="item.title" @click="userVisible(item)">
        <v-list-tile-avatar>
          <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title><strong>{{ item.name }}</strong> ({{ item.account }})</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-layout align-center justify-center row>
        <v-btn @click="createUser()">创建用户</v-btn>
        <v-btn @click="left = !left">返回</v-btn>
      </v-layout>
    </v-list>
    <v-list style="border-bottom: 1px solid #ccc" v-else>
      {{ this.editUser }}
      <v-btn @click="userInfoVisible = !userInfoVisible">back</v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data(){
    return {
      left: this.mainVisible,
      userInfoVisible: false,
      editUser: {},
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', account: 'user1', name: 'Jack', email: 'user1@mail.com' },
        { icon: 'call_to_action', iconClass: 'amber white--text', account: 'user2', name: 'Mona', email: 'user2@mail.com' }
      ]
    }
  },
  props:{
    mainVisible: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    mainVisible(val){
      this.left = val
    },
  },
  methods: {
    userVisible(userInfo){
      if(userInfo){
        this.userInfoVisible = true
        this.editUser = userInfo
      }
    }
  }
}
</script>

<style>

</style>
