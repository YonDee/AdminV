<template>
<div :class="['float-tool ', visible ? 'clicked' :  '']" >
  <v-btn fab dark small color="primary" v-for="(iten,i) in 3" :key="i" :class="['btn-tool ', 'position-' + ( i+1 )]" v-show="visible && i<3" >
    <v-icon dark>remove</v-icon>
  </v-btn>
  <v-btn fab dark :color="visible ? 'grey' : 'primary'" @click="showTools()" class="animated zoomIn fast">
    <v-icon dark>clear</v-icon>
  </v-btn>
</div>
</template>

<script>
export default {
  data(){
    return {
      visible: false
    }
  },
  methods: {
    showTools(){
      this.visible = !this.visible
    },
  }
}
</script>

<style lang="stylus" scoped>
.float-tool
  position fixed
  bottom 45px
  right 10px
  transition all .3s ease
  transform rotate(-45deg)
  .btn-tool
    position absolute
    transition all .3s ease
    &.position-1
      left -70px
      top 7px
    &.position-2
      left -45px
      top -45px
    &.position-3
      left 7px
      top -70px
  &.clicked
    transform rotate(0)
    transition all .3s ease
</style>
