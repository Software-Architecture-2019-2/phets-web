<template>
  <b-card class="card" no-body>
    <b-tabs class="tabs" pills card vertical nav-wrapper-class="w-25">
      <b-tab @click="getChannel" title="Friend name" class="chat">
        <b-card-title>Friend Name</b-card-title>
        <hr />
        <div class="messages">
          <b-card-text
            v-for="(message, i) in messages"
            :key="i"
            v-b-tooltip.hover
            title="message.sent == 'andreavilan@gmail.com' ? 'Enviado' : 'Recibido'"
          >{{ message.message }}</b-card-text>
        </div>
        <hr />
        <b-input-group>
          <b-form-input type="text" v-model="message.content"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-secondary" type="submit" v-on:click="sendMessage()">Enviar</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { ACTIONS } from '../../constants/VuexConstants'
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: {
    messages: {
      type: [],
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
      console.log('object')
      this.$store.dispatch(ACTIONS.MESSAGE_SENT, this.message)
    },
  },
}
</script>
<style>
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