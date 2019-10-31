<template>
  <div v-if="session">
    <navbar />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      session: (state) => state.auth.session,
    }),
  },
  watch: {
    session() {
      this.validateSession()
    },
  },
  async mounted() {
    if (!this.session) {
      await this.$store.dispatch(ACTIONS.SESSION_LOAD)
    }
    this.validateSession()
  },
  methods: {
    validateSession() {
      if (!this.session) {
        this.$router.push('/')
        this.$destroy()
      }
    },
  },
}
</script>
