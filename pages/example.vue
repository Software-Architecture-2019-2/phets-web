<template>
  <div class="container">
    <div>
      <example-comp />
      <!-- Component usage -->
      <h1 class="title">Página de ejemplo</h1>
      <h2 class="subtitle">
        Página de ejemplo para desarrollar Phets software system.
      </h2>
      <div v-for="number in array" :key="number" class="links">
        {{ number }}
      </div>
    </div>
  </div>
</template>

<script>
import ExampleComp from '~/components/ExampleComp'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    ExampleComp,
  },
  props: {
    id: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      array: [1, 2, 3, 4, 5],
    }
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
  },
  created() {
    this.authenticate('bsavilanr@slabcode.com', 'MYPASS')
  },
  methods: {
    authenticate(username, password) {
      this.$store.dispatch(ACTIONS.LOGIN, {
        username,
        password,
      })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
