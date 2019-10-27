<template>
  <b-tab :title="title" :active="active">
    <b-card :title="title">
      <b-tabs :id="id" v-if="events.length" pills card vertical nav-class="fixed-nav-height">
        <event-tab v-for="(event, i) in events" :key="i" :event="event" :active="i === 0" />
      </b-tabs>
      <template v-else>
        <div class="text-center text-muted">
          Al parecer aún no hay nada aquí
          <br />Añade uno nuevo en el botón
          <b>+ Agregar un evento</b> en la parte superior.
        </div>
      </template>
    </b-card>
  </b-tab>
</template>

<script>
import EventTab from '~/components/events/EventTab'

export default {
  components: {
    EventTab,
  },
  props: {
    id: {
      type: String,
      default: Math.random()
        .toString(36)
        .substring(7),
    },
    title: {
      type: String,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style>
.fixed-nav-height {
  flex-wrap: nowrap;
  overflow: auto;
  max-height: calc(100vh - 56px - 230px);
}
</style>
