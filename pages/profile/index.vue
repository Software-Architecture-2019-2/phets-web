<template>
  <div v-if="model" class="container">
    <div class="text-left">
      <h1>Perfil</h1>
      <div>
        <b-card
          v-if="model"
          title="Descripcion:"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text style="solid ">{{ model.description }}</b-card-text>

          <b-row>
            <b-col sm="4">
              <label for="nombre-input">Nombre:</label>
            </b-col>
            <b-col sm="8">
              <label id="nombre-input">{{ model.firstName }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="4">
              <label for="nombre-input">Apellido:</label>
            </b-col>
            <b-col sm="8">
              <label id="nombre-input">{{ model.lastName }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="4">
              <label for="usuario-input">Nombre de usuario:</label>
            </b-col>
            <b-col sm="8">
              <label id="usuario-input">{{ model.username }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="4">
              <label for="correo-input">Correo:</label>
            </b-col>
            <b-col sm="8">
              <label id="correo-input">{{ model.email }}</label>
            </b-col>
          </b-row>
        </b-card>

        <b-row>
          <b-col>
            <b-button to="/profile/edit" variant="primary"
              >Editar perfil</b-button
            >
          </b-col>
          <b-col>
            <b-button to="/animal/create" variant="primary"
              >Agregar Mascota</b-button
            >
          </b-col>
          <b-col>
            <b-link variant="link" @click="print()">print</b-link>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  computed: {
    ...mapState({
      model: (state) => state.user.current,
      own: (state) => state.animal.own,
    }),
  },
  created() {
    this.$store.dispatch(ACTIONS.USER_GET_PROFILE)
    this.$store.dispatch(ACTIONS.ANIMAL_OWN)
  },
  methods: {
    print() {
      console.log(this.own)
      console.log(this.model)
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
</style>
