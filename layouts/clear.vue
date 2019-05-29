<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <Nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <Message />
  </v-app>
</template>

<script>
import Message from '~/components/common/Message'
export default {
  components: {
    Message
  }
}
</script>
