<template>
  <div class="container">
    <div class="text-left">
      <h1>Editar Perfil</h1>
      <b-form @submit.prevent="editProfile">
        <b-card
          title="Descripcion:"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-form-group label="Descripcion" label-class="font-weight-bold">
            <b-form-textarea
              v-model="model.description"
              style="solid "
              placeholder="ej: Amo los animales! ~(^-^)~"
            />
          </b-form-group>

          <b-form-group label="Nombre" label-class="font-weight-bold">
            <b-input v-model="model.firstName" />
          </b-form-group>

          <b-form-group label="Apellido" label-class="font-weight-bold">
            <b-input v-model="model.lastName" />
          </b-form-group>

          <b-form-group
            label="Nombre de usuario"
            label-class="font-weight-bold"
          >
            <b-input v-model="model.username" />
          </b-form-group>

          <b-form-group label="Correo" label-class="font-weight-bold">
            <b-input v-model="model.email" />
          </b-form-group>

          <b-row>
            <b-col>
              <b-button size="sm" type="submit" variant="outline-primary">
                Guardar Cambios</b-button
              >
            </b-col>
            <b-col>
              <b-button size="sm" to="/profile" variant="outline-primary">
                cancelar</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  data() {
    return {
      model: {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email,
        description: this.user.description,
        media: [],
      },
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.current,
    }),
  },
  created() {
    this.$store.dispatch(ACTIONS.USER_GET_PROFILE)
  },
  methods: {
    editProfile() {
      console.log(this.model)
      this.$store.dispatch(ACTIONS.USER_EDIT, this.model)
      this.$router.push({ path: '/profile' })
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
