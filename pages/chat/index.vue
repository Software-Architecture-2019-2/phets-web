<template>
  <b-card class="card" no-body>
    <b-tabs class="tabs" pills card vertical nav-wrapper-class="w-25">
      <b-tab title="Andrew" class="chat" @click="getChannel">
        <b-card-title>Andrew</b-card-title>
        <hr />
        <div class="messages">
          <b-card-text
            v-for="(msg, i) in messages"
            :key="i"
            v-b-tooltip.hover
            :style="[
              msg.sentEmail == message.sent
                ? { 'text-align': 'right' }
                : { 'text-align': 'left' },
            ]"
            :title="[msg.sentEmail == message.sent ? 'Enviado' : 'Recibido']"
            >{{ msg.message }}</b-card-text
          >
        </div>
        <hr />
        <b-input-group>
          <b-form-input v-model="message.content" type="text"></b-form-input>
          <b-input-group-append>
            <b-button
              variant="outline-secondary"
              type="submit"
              @click="sendMessage()"
              >Enviar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { ACTIONS } from '~/constants/VuexConstants'
import { fireDb } from '~/plugins/firebase'

export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      getMessages: false,
      required: true,
      message: {
        content: null,
        sent: 'brandonavilan@gmail.com',
        received: 'andreavilan@gmail.com',
      },
    }
  },
  methods: {
    async getChannel() {
      const received = 'brandonavilan@gmail.com'
      const sent = 'andreavilan@gmail.com'
      this.messages = []
      const query1 = fireDb
        .collection('channels')
        .doc(received)
        .collection(sent)
        .orderBy('time', 'asc')
      const query2 = fireDb
        .collection('channels')
        .doc(sent)
        .collection(received)
      try {
        await query1.get().then((docSnapshot) => {
          if (docSnapshot.docs.length > 0) {
            query1.onSnapshot((res) => {
              if (res.docChanges()) {
                this.messages = []
                res.docChanges((msm) => {
                  this.messages.push(msm.data())
                })
              }
              res.docs.forEach((doc) => {
                this.messages.push(doc.data())
              })
              console.log(this.messages)
            })
          } else {
            query2.onSnapshot((res) => {
              if (res.docChanges()) {
                this.messages = []
                res.docChanges((msm) => {
                  this.messages.push(msm.data())
                })
              }
              res.docs.forEach((doc) => {
                this.messages.push(doc.data())
              })
            })
          }
        })
      } catch (e) {
        console.error(e)
      }
      this.getMessages = true
    },
    sendMessage() {
      this.$store.dispatch(ACTIONS.MESSAGE_SENT, this.message)
      // this.message.content = ''
    },
  },
}
</script>

<style scoped>
.card {
  height: calc(100vh - 56px);
}
.tabs {
  height: 100%;
}
.chat {
  height: 100%;
}
.messages {
  height: 78%;
}
.sent {
  text-align: right;
}
</style>
