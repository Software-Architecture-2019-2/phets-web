<template>
  <b-container>
    <b-row class="my-5">
      <b-col>
        <span class="h2">{{ model.id ? 'Modificar' : 'Agregar' }} evento</span>
      </b-col>
      <b-col v-if="model.id" cols="auto">
        <b-button variant="danger" @click="confirmDelete(model.id)">Eliminar evento</b-button>
      </b-col>
    </b-row>
    <b-form @submit.prevent="save">
      <b-form-group label="Nombre del evento">
        <b-input v-model="model.subject" placeholder="ej: Cita en veterinaria" />
      </b-form-group>
      <b-form-group label="Fecha">
        <datepicker v-model="model.date" :min-date="new Date()" />
      </b-form-group>
      <b-form-group label="Descripción">
        <b-textarea
          v-model="model.description"
          placeholder="ej: Aplicar vacuna de la rabia."
          rows="3"
        />
      </b-form-group>
      <b-row align-h="center">
        <b-col cols="auto">
          <b-button variant="danger" @click="$router.go(-1)">Cancelar</b-button>
        </b-col>
        <b-col cols="auto">
          <b-button type="submit" variant="primary">Guardar cambios</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from '~/components/Datepicker'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: { Datepicker },
  data() {
    return {
      model: {
        subject: undefined,
        date: undefined,
        description: undefined,
      },
    }
  },
  computed: {
    ...mapState({
      event: (state) => state.event.item,
    }),
  },
  created() {
    if (this.event) {
      this.model = { ...this.event }
    }
  },
  destroyed() {
    this.$store.dispatch(ACTIONS.EVENT_RESET)
  },
  methods: {
    save() {
      const event = this.model
      delete event.id
      const { id } = this.event
      const saved = this.$store.dispatch(ACTIONS.EVENT_SAVE, { id, event })
      if (saved) {
        console.info('Se ha guardado satisfactoriamente')
        this.$router.push('/events')
      } else {
        console.info('Ha ocurrido un error, intenta más tarde')
      }
    },
    confirmDelete(id) {
      const deleted = this.$store.dispatch(ACTIONS.EVENT_DELETE, id)
      if (deleted) {
        console.info('Se ha eliminado satisfactoriamente')
      } else {
        console.info('Ha ocurrido un error, intenta más tarde')
      }
    },
  },
}
</script>
