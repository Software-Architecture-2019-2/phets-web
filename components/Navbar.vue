<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Phets</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/phets">Phets</b-nav-item>
        <b-nav-item to="/adopt">Adoptar</b-nav-item>
        <b-nav-item to="/chat">
          <font-awesome-icon :icon="['fas', 'comment-alt']" />
          Chats
        </b-nav-item>
        <b-nav-item to="/events">Eventos</b-nav-item>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <font-awesome-icon :icon="['fas', 'bell']" />
            <span>Notificaciones</span>
          </template>
          <template v-if="notifications.length">
            <b-dropdown-item
              v-for="(notification, i) in notifications"
              :key="i"
            >{{ notification.notification_body }}</b-dropdown-item>
          </template>
          <b-dropdown-item disabled v-else>Por el momento no hay nada acá.</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <font-awesome-icon :icon="['fa', 'user']" />
            <b>{{ username }}</b>
          </template>
          <b-dropdown-item to="/profile">Perfil</b-dropdown-item>
          <b-dropdown-item to="/animal/home">Mis mascotas</b-dropdown-item>
          <b-dropdown-item @click="logout">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  computed: {
    ...mapState({
      notifications: (state) => state.notifications.list,
      username: (state) => state.auth.session.username,
    }),
  },
  created() {
    this.$store.dispatch(ACTIONS.NOTIF_LIST)
  },
  methods: {
    logout() {
      this.$store.dispatch(ACTIONS.LOGOUT)
    },
  },
}
</script>
