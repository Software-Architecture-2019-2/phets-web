<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <span class="h1">Phets</span>
      </b-col>
    </b-row>
    <template v-if="ownPets.length">
      <b-row align-v="center" class="my-3">
        <b-col>
          <p v-if="selected">
            Buscando mascotas de género
            <i>{{ gender(!selected.gender) }}</i> de tipo
            <i>{{ selected.animal_type.value }}</i>
            para
            <b>{{ selected.name }}</b>
          </p>
        </b-col>
        <b-col v-if="ownPets.length">
          <b-form-group label="Cambiar mascota seleccionada:" label-cols-md="6">
            <b-select v-model="selected" :options="ownPets" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="animals.length" align-v="center" align-h="center">
        <b-col cols="auto">
          <pet-data :animal="animals[0]" />
        </b-col>
        <b-col cols="auto">
          <b-row class="button-group">
            <b-btn class="btn-xxl" variant="success" pill @click="phet(true)">
              <font-awesome-icon :icon="['fas', 'check-circle']" />
            </b-btn>
          </b-row>
          <b-row class="button-group">
            <b-btn class="btn-xxl" variant="danger" pill @click="phet(false)">
              <font-awesome-icon :icon="['fa', 'times-circle']" />
            </b-btn>
          </b-row>
        </b-col>
      </b-row>
      <p v-else>No hay animales para phet.</p>
    </template>
    <p v-else>No has registrado animales aún.</p>

    <b-modal ref="match" hide-footer title="¡Es un match!">
      Felicidades {{ selected.name }}, también le has gustado a esta mascota.
      <b-button variant="success" @click="goToChat">Ir al chat</b-button>
      <b-button variant="warning" @click="hideModal">Seguir acá</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import PetData from '~/components/PetData'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    PetData,
  },
  data() {
    return {
      selected: {
        animal_type: {},
      },
      animals: [],
      goToChat: () => {},
    }
  },
  computed: {
    ...mapState({
      ownPets: (state) =>
        state.animal.own
          .filter((animal) => !animal.adoption)
          .map((animal) => ({
            value: animal,
            text: animal.name,
          })),
    }),
  },
  watch: {
    selected(animal) {
      this.search()
    },
  },
  async created() {
    await this.$store.dispatch(ACTIONS.ANIMAL_OWN)
    if (this.ownPets.length) {
      this.selected = this.ownPets[0].value
      this.search()
    }
  },
  methods: {
    async search() {
      await this.$store.dispatch(ACTIONS.ANIMAL_PHETS, this.selected.id)
      this.animals = [...this.$store.state.animal.list]
    },
    async phet(value) {
      const animal = this.animals.shift()
      const interaction = await this.$store.dispatch(ACTIONS.PHETS_PHET, {
        idFrom: this.selected.id,
        idTo: animal.id,
        like: value,
      })
      if (interaction && interaction.match1 && interaction.match2) {
        this.goToChat = () => {
          this.$store.dispatch(
            ACTIONS.CHAT_ACTIVE,
            `${this.selected.id}#${animal.id}`
          )
          this.$router.push('/chat')
        }
        this.$refs.match.show()
      }
    },
    hideModal() {
      this.$refs.match.hide()
    },
    gender(gender) {
      return gender ? 'Femenino' : 'Masculino'
    },
  },
}
</script>

<style lang="sass" scoped>
.button-group
  padding: 1.5rem

  .btn-xxl
    width: 104px
    padding: 0.5rem 1rem;
    font-size: 3rem;
    line-height: 1.8;
</style>
