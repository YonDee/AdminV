<template>
  <v-snackbar
    :top="true"
    :color="snackbar.color"
    v-model="snackbar.state"
  >
    {{ snackbar.message }}
    <v-btn
      color="#fff"
      flat
      @click="snackbar.state = false"
    >
      ×
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data(){
    return {
      snackbar: {state: false, message: '???????.', color: '#545454', type: 'info'},
    }
  },
  computed: {
    message(){
      return this.$store.state.snackbar.data
    }
  },
  watch: {
    message(data){
      const defaultOpt = this.snackbar
      if( data.type && !data.color ){
        switch (data.type) {
          case 'success':
            data.color = 'rgb(48, 169, 26)'
            break;
          case 'error':
            data.color = '#F44336'
            break;
          case 'warning':
            data.color = "#F95D02"
            break;
          default:
            data.color = '#545454'
            break;
        }
      }
      this.snackbar = {...defaultOpt, ...data, state: true}
    }
  }
}
</script>
