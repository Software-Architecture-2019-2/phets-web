<template>
  <div class="container">
    <div class="text-left">
      <h1>Editar Mascota</h1>
      <pet-data :idAnimal="id" />
      <b-row>
        <b-col>
          <b-button>Guardar</b-button>
        </b-col>
        <b-col>
          <b-button to="/animal/edit" variant="primary">Editar Mascota</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import PetData from '~/components/PetData'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    PetData,
  },
  props: {
    id: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
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
