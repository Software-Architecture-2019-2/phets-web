<template>
  <div class="container">
    <video autoplay muted loop id="video">
      <source src="../assets/video.mp4" />
    </video>
    <div class="content">
      <b-card>
        <h2>PHETS</h2>
        <b-card-text>Un nuevo mundo!</b-card-text>
        <b-button block variant="light" v-b-modal.ingreso>Ingresar</b-button>
        <b-button block variant="light" v-b-modal.registro>Registrarse</b-button>
      </b-card>
    </div>
    <b-modal hide-footer id="ingreso" title="Iniciar sesión">
      <b-form @submit.prevent="authenticate" class="form">
        <label class="sr-only" for="login-username">Usuario</label>
        <b-input-group prepend="Usuario" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input v-model="login.username" type="text" id="login-username" placeholder="Usuario"></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="login-password">Contraseña</label>
        <b-input-group prepend="Contraseña" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="login.password"
            type="password"
            id="login-password"
            placeholder="Contraseña"
          ></b-input>
        </b-input-group>
        <br />
        <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
        <br />
        <b-button type="submit" variant="success">Log In</b-button>
      </b-form>
    </b-modal>
    <b-modal hide-footer id="registro" title="Registrarse">
      <b-form @submit.prevent="create" class="form">
        <label class="sr-only" for="inline-form-input-name">Nombre</label>
        <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="register.firstName"
            type="text"
            id="inline-form-input-name"
            placeholder="Nombre"
          ></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="inline-form-input-lastname">Apellido</label>
        <b-input-group prepend="Apellido" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="register.lastName"
            type="text"
            id="inline-form-input-lastname"
            placeholder="Apellido"
          ></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="inline-form-input-username">Usuario</label>
        <b-input-group prepend="Usuario" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="register.username"
            type="text"
            id="inline-form-input-username"
            placeholder="Usuario"
          ></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="inline-form-input-email">Email</label>
        <b-input-group prepend="Email" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="register.email"
            type="email"
            id="inline-form-input-email"
            placeholder="Email"
          ></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="inline-form-input-password">Contraseña</label>
        <b-input-group prepend="Contraseña" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="register.password"
            type="password"
            id="inline-form-input-password"
            placeholder="Contraseña"
          ></b-input>
        </b-input-group>
        <br />
        <label class="sr-only" for="inline-form-input-cpassword">Confirmar</label>
        <b-input-group prepend="Confirmar" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            type="password"
            id="inline-form-input-cpassword"
            placeholder="Confirmar Contraseña"
          ></b-input>
        </b-input-group>
        <br />
        <br />
        <b-button type="submit" variant="success">Sign up</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  layout: 'index',
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
      register: {
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    authenticate(event) {
      this.$store.dispatch(ACTIONS.LOGIN, this.login)
    },
    create(event) {
      this.$store.dispatch(ACTIONS.REGISTER, this.register)
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
#video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
}
.card {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  min-width: 200px;
}
.modal-header {
  display: flex;
  justify-content: center;
  position: relative;
}
.close {
  position: absolute;
  right: 2rem;
}
.modal-body {
  padding: 1rem 2rem;
}
.form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.input-group-text {
  min-width: 110px;
}
</style>
