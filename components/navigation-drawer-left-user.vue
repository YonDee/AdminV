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
    <v-flex style="border-bottom: 1px solid #ccc; padding: 10px" class="animated zoomIn faster" v-else>
      <v-text-field
      v-model="user.name"
      label="Name"
      :counter="10"
      :error-messages="nameErrors"
      @input="$v.user.name.$touch()"
      @blur="$v.user.name.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.account"
      :error-messages="accountErrors"
      label="Account"
      @blur="$v.user.account.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.email"
      label="Email"
      :error-messages="emailErrors"
      @blur="$v.user.email.$touch()"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.password"
      :error-messages = "passwordErrors"
      @input="$v.user.password.$touch()"
      @blur="$v.user.password.$touch()"
      type="password"
      label="Password"
      :counter="20"
      clearable
      required>
      </v-text-field>
      <v-text-field
      v-model="user.confirm_password"
      :error-messages = "confirm_passwordErrors"
      @blur="$v.user.confirm_password.$touch()"
      validate-on-blur
      type="password"
      label="Confirm Password"
      clearable
      required>
      </v-text-field>
      <v-layout align-center justify-center row>
        <v-btn @click="submit">提交</v-btn>
        <v-btn @click="userInfoVisible = !userInfoVisible">返回</v-btn>
      </v-layout>
    </v-flex>
  </v-navigation-drawer>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    user: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      account: { required },
      password: { required, maxLength: maxLength(20) }, // define
      confirm_password: { required, sameAsPassword: sameAs('password')  }
    },
  },
  data(){
    return {
      left: this.mainVisible,
      userInfoVisible: false,
      user: {},
      items2: [
        { icon: 'assignment',id:"1", iconClass: 'blue white--text', account: 'user1', name: 'Jack', email: 'user1@mail.com' },
        { icon: 'call_to_action',id: "2", iconClass: 'amber white--text', account: 'user2', name: 'Mona', email: 'user2@mail.com' }
      ],
    }
  },
  props:{
    mainVisible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.user.name.$dirty) return errors
      !this.$v.user.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.user.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('Must be valid e-mail')
      !this.$v.user.email.required && errors.push('E-mail is required')
      return errors
    },
    accountErrors () {
      const errors = []
      if (!this.$v.user.account.$dirty) return errors
      !this.$v.user.account.required && errors.push('Account is required')
      return errors
    },
    passwordErrors (){
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.required && errors.push('Password is required')
      return errors
    },
    confirm_passwordErrors (){
      const errors = []
      if (!this.$v.user.confirm_password.$dirty) return errors
      !this.$v.user.confirm_password.sameAsPassword && errors.push('Inconsistent password input twice.')
      !this.$v.user.confirm_password.required && errors.push('Confirm password is required')
      return errors
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
        this.user = user
      }
    },
    userCreate(user){
      this.userInfoVisible = true
      this.user = {
        id: '',
        name: '',
        account: '',
        email: '',
        password: ''
      }
    },
    // submit
    submit(){
      this.$v.$touch()
      if(this.$v.$invalid){
        console.log('提交失败')
      }else{
        console.log('提交成功')
      }
    }
  },
}
</script>

<style>

</style>
