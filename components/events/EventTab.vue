<template>
  <b-tab :title="`(${event.date}) ${event.subject}`" :active="active">
    <span class="h4">{{ event.subject }} ({{ event.date }})</span>
    <hr />
    <p>{{ event.description }}</p>
    <div class="text-center">
      <b-button variant="outline-warning" @click="edit(event.id)"
        >Modificar</b-button
      >
    </div>
  </b-tab>
</template>

<script>
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async edit(id) {
      await this.$store.dispatch(ACTIONS.EVENT_GET, id)
      this.$router.push('form')
    },
  },
}
</script>
