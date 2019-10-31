<template>
  <b-card class="card-chat" no-body>
    <b-tabs class="tabs-chat" pills card vertical nav-wrapper-class="w-25">
      <b-tab title="Chat Adopcion" disabled></b-tab>
      <b-tab
        v-for="(user, i) in users"
        :key="i"
        :title="user.name"
        class="chat-container"
        @click="getChannel(user.id.toString())"
      >
        <b-card-title>{{ user.name }}</b-card-title>
        <hr />
        <div id="scroll" class="chat-messages">
          <b-card-text
            v-for="(msg, j) in messages"
            :key="j"
            :style="[
              msg.sent == user.id
                ? { 'text-align': 'left' }
                : { 'text-align': 'right' },
            ]"
            >{{ msg.message }}</b-card-text
          >
        </div>
        <hr />
        <b-input-group>
          <b-form-input v-model="message.content" type="text"></b-form-input>
          <b-input-group-append class="sent-button">
            <b-button
              variant="outline-secondary"
              type="submit"
              @click="sendMessage(user.id)"
              >Enviar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-tab>
      <b-tab title="Chat Phets" disabled></b-tab>
      <b-tab
        v-for="(pet, i) in phetsList"
        :key="`${i}-${pet.sent}`"
        :title="`${pet.receivedInfo.name} - ${pet.sentInfo.name}`"
        class="chat-container"
        :active="activeChat === `${pet.sent}#${pet.received}`"
        @click="getChannel(pet.received, pet.sent)"
      >
        <b-card-title
          >{{ pet.receivedInfo.name }} - {{ pet.sentInfo.name }}</b-card-title
        >
        <hr />
        <div id="scroll" class="chat-messages">
          <b-card-text
            v-for="(msg, j) in messages"
            :key="j"
            :style="[
              msg.sent == pet.sent
                ? { 'text-align': 'right' }
                : { 'text-align': 'left' },
            ]"
            >{{ msg.message }}</b-card-text
          >
        </div>
        <hr />
        <b-input-group>
          <b-form-input v-model="message.content" type="text"></b-form-input>
          <b-input-group-append class="sent-button">
            <b-button
              variant="outline-secondary"
              type="submit"
              @click="sendMessage(pet.received, pet.sent)"
              >Enviar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'
import { fireDb } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      getMessages: false,
      required: true,
      message: {
        content: null,
        sent: null,
        received: null,
        adopt: false,
      },
      messages: [],
      users: [],
      phetsList: [],
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.auth.session.username,
      ownPets: (state) => state.animal.own,
      activeChat: (state) => state.chat.active,
    }),
  },
  async created() {
    await this.$store.dispatch(ACTIONS.ANIMAL_OWN, this.username)
    this.users = []
    this.phetsList = []
    const query = fireDb
      .collection('adoptChatList')
      .doc(this.username)
      .collection('users')

    query.get().then((doc) => {
      query.onSnapshot((res) => {
        if (res.docChanges()) {
          this.users = []
        }
        res.docs.forEach(async (doc) => {
          await this.$store.dispatch(ACTIONS.ANIMAL_GET, doc.id).then((res) => {
            this.users.push(res)
          })
          this.getChannel(this.users[0].id.toString())
        })
      })
    })
    if (this.ownPets) {
      this.ownPets.forEach((pet) => {
        this.$store.dispatch(ACTIONS.PHETS_GET, pet.id).then((matchs) => {
          matchs.forEach(async (match) => {
            if (match.match1 && match.match2) {
              const petInfo = {
                sent: match.idMain.toString(),
                received: match.idSecondary.toString(),
              }
              await this.$store
                .dispatch(ACTIONS.ANIMAL_GET, match.idMain)
                .then((res) => {
                  petInfo.sentInfo = res
                })
              await this.$store
                .dispatch(ACTIONS.ANIMAL_GET, match.idSecondary)
                .then((res) => {
                  petInfo.receivedInfo = res
                })
              this.phetsList.push(petInfo)
            }
          })
        })
      })
    }
  },
  methods: {
    async getChannel(received, pet) {
      let sent = this.username
      if (pet) {
        sent = pet
      }
      this.messages = []
      if (received && sent) {
        const query1 = fireDb
          .collection('channels')
          .doc(received)
          .collection(sent)
          .orderBy('time', 'asc')
        const query2 = fireDb
          .collection('channels')
          .doc(sent)
          .collection(received)
          .orderBy('time', 'asc')
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
      }
    },
    async sendMessage(received, sent) {
      this.message.received = received
      this.message.sent = this.username
      if (sent) {
        this.message.sent = sent
      }
      await this.$store
        .dispatch(ACTIONS.MESSAGE_SENT, this.message)
        .then((res) => {
          this.message.content = ''
        })
    },
  },
}
</script>
<style>
.card-chat {
  height: calc(100vh - 56px);
}
.tabs-chat {
  height: 100%;
}
.chat-container {
  height: 100%;
}
.chat-messages {
  height: 78%;
  max-height: 480px;
  overflow-y: auto;
  padding: 0 20px;
}
.sent-button {
  padding: 0 20px;
}
</style>
