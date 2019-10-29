<template>
  <div class="container">
    <div class="text-left">
      <h1>Perfil</h1>
      <div>
        <b-card
          title="Descripcion:"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text style="solid ">{{ model.description }}</b-card-text>

          <b-row>
            <b-col sm="2">
              <label for="nombre-input">Nombre:</label>
            </b-col>
            <b-col sm="10">
              <label id="nombre-input">{{ model.name }}</label>
            </b-col>
          </b-row>


          <b-row>
            <b-col sm="2">
              <label for="usuario-input">Nombre de usuario:</label>
            </b-col>
            <b-col sm="10">
              <label id="usuario-input">{{ model.username }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="2">
              <label for="correo-input">Correo:</label>
            </b-col>
            <b-col sm="10">
              <label id="correo-input">{{ model.email }}</label>
            </b-col>
          </b-row>

        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      model: {
        id: null,
        name: undefined,
        lastName: undefined,
        username: undefined,
        email: undefined,
        description: undefined,
      },
    }
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
    ...mapState({
      model: (state) => state.user.current,
    }),
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

