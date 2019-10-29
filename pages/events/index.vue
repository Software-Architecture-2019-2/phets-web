<template>
  <b-card title="Mis eventos">
    <b-button variant="success" to="form">+ Agregar un evento</b-button>
    <b-tabs pills card vertical>
      <events-tab
        id="future-events"
        title="Eventos futuros"
        :events="futureEvents"
        active
      />
      <events-tab
        id="past-events"
        title="Eventos pasados"
        :events="pastEvents"
      />
    </b-tabs>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import EventsTab from '~/components/events/EventsTab'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    EventsTab,
  },
  data() {
    return {
      today: new Date(),
    }
  },
  computed: {
    ...mapState({
      events: (state) => state.event.list,
    }),
    futureEvents() {
      if (this.events)
        return this.events.filter((e) => this.today <= new Date(e.date))
      return []
    },
    pastEvents() {
      if (this.events) {
        return this.events.filter((e) => this.today > new Date(e.date))
      }
      return []
    },
  },
  created() {
    this.$store.dispatch(ACTIONS.EVENT_LIST)
  },
}
</script>
