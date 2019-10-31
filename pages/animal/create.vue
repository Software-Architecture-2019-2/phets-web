<template>
  <div class="container">
    <div class="text-left">
      <h1>Editar Mascota</h1>
      <b-card
        title="Editar Mascota:"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        style="max-width: 30rem;"
        tag="article"
        class="mb-2"
      >
        <b-row>
          <b-form-input
            id="name-input"
            v-model="animalItem.name"
          ></b-form-input>
        </b-row>
        <b-row>
          <b-col>Raza:</b-col>
          <b-form-input
            id="breed-input"
            v-model="animalItem.breed"
          ></b-form-input>
        </b-row>
        <b-row>
          <b-col>Genero:</b-col>
          <b-form-input
            id="gender-input"
            v-model="animalItem.gender"
          ></b-form-input>
        </b-row>
        <b-row>
          <b-col>Fecha de nacimiento:</b-col>
          <b-form-input
            id="birthdate-input"
            v-model="animalItem.birthdate"
          ></b-form-input>
        </b-row>
      </b-card>
      <b-row>
        <b-col>
          <b-button>Guardar Mascota</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  data() {
    return {
      idAnimal: this.$route.params.id,
      animalItem: {
          name: "",
          breed: "",
          gender: "",
          adoption: false,
          birthdate: "",
          user: this.username,
      }
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.auth.session.username,
    }),
  },
  created() {
    this.$store.dispatch(ACTIONS.ANIMAL_GET, this.animalItem)
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
