<template>
  <v-navigation-drawer
    v-model="left"
    temporary
    fixed
    stateless
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
    <v-list two-line subheader v-if="!userInfoVisible" style="border-bottom: 1px solid #ccc" class="animated slideInDown faster">
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
        <v-btn @click="userCreate()">创建用户</v-btn>
        <v-btn @click="$emit('closeUserManager')">返回</v-btn>
      </v-layout>
    </v-list>
    <v-form style="border-bottom: 1px solid #ccc; padding: 10px" class="animated zoomIn faster" v-else>
      <!-- <v-text-field
      v-model="editUser.id"
      label="ID"
      xs12
      required
      disabled
      v-if="editUser.id">
      </v-text-field> -->
      <v-text-field
      v-model="editUser.name"
      label="Name"
      :rules="[rules.required, rules.counter]"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="editUser.account"
      label="Account"
      :rules="[rules.required, rules.counter]"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="editUser.email"
      label="Email"
      clearable
      :rules="[rules.required, rules.email]"
      required>
      </v-text-field>
      <v-text-field
      v-model="editUser.password"
      label="Password"
      :rules="[rules.required]"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="editUser.confirm_password"
      validate-on-blur
      :rules="[rules.required, rules.confirm_password]"
      label="Confirm Password"
      clearable
      required>
      </v-text-field>
      <v-layout align-center justify-center row>
        <v-btn @click="userInfoVisible = !userInfoVisible">提交</v-btn>
        <v-btn @click="userInfoVisible = !userInfoVisible">返回</v-btn>
      </v-layout>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
export default {
  data(){
    var passVolid = (value) => {
      let res = false
      if(value == this.editUser.password){
        res = true
      }
      return res || 'Invalid password.'
    };
    return {
      left: this.mainVisible,
      userInfoVisible: false,
      editUser: {},
      items2: [
        { icon: 'assignment',id:"1", iconClass: 'blue white--text', account: 'user1', name: 'Jack', email: 'user1@mail.com' },
        { icon: 'call_to_action',id: "2", iconClass: 'amber white--text', account: 'user2', name: 'Mona', email: 'user2@mail.com' }
      ],
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        confirm_password: (value) => {
          if(value){
            return passVolid(value)
          }
          return 'Invalid password.'
        }
      }
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
    }
  },
  methods: {
    userVisible(user){
      if(user){
        this.userInfoVisible = true
        this.editUser = user
      }
    },
    userCreate(user){
      this.userInfoVisible = true
      this.editUser = {
        id: '',
        name: '',
        account: '',
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    window.vue = this
  },
}
</script>

<style>

</style>
