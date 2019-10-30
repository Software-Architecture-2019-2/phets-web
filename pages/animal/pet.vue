<template>
  <div class="container">
    <div class="text-left">
      <h1>Perfil Mascota</h1>
      <pet-data :id-animal="id" />
      <b-button to="/animal/edit" variant="primary">Editar Mascota</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PetData from '~/components/PetData'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    PetData,
  },
  data() {
    return {
      idAnimal: this.$route.params.id,
    }
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
    ...mapState({
      animalItem: (state) => state.animal.item,
    }),
  },
  methods: {
    get() {
      this.$store.dispatch(ACTIONS.ANIMAL_GET, this.idAnimal)
    },
  },
}
</script>

<style scoped>
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
