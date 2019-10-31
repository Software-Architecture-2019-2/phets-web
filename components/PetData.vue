<template>
  <div class="dataPet">
    <b-card v-if="animalItem" no-body class="mb-2 animal-card">
      <file-preview v-if="animalItem.media.length" :id="animalItem.media[0]" />

      <b-card-body>
        <b-card-title>{{ animalItem.name }}</b-card-title>
        <b-container>
          <b-row>
            <b-col>Raza:</b-col>
            <b-col>{{ animalItem.breed }}</b-col>
          </b-row>
          <b-row>
            <b-col>Genero:</b-col>
            <b-col>{{ gender(animalItem.gender) }}</b-col>
          </b-row>
          <b-row>
            <b-col>Fecha de nacimiento:</b-col>
            <b-col>{{ animalItem.birthdate }}</b-col>
          </b-row>
        </b-container>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'
import FilePreview from '~/components/FilePreview'

export default {
  components: { FilePreview },
  props: {
    idAnimal: {
      type: Number,
      default: undefined,
    },
    animal: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      model: {
        id: null,
        name: undefined,
        breed: undefined,
        gender: undefined,
        birthdate: undefined,
      },
    }
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
    ...mapState({
      animalItem(state) {
        return this.animal || state.animal.item
      },
    }),
  },
  created() {
    if (this.idAnimal) {
      this.$store.dispatch(ACTIONS.ANIMAL_GET, this.idAnimal)
    } else if (this.animalItem === undefined) {
      this.$router.go(-1)
    }
  },
  methods: {
    gender(gender) {
      return gender ? 'Femenino' : 'Masculino'
    },
  },
}
</script>

<style lang="sass" scoped>
.animal-card
  width: 600px
  height: 430px
</style>

<style lang="sass">
.animal-card
  img, .card-img
    height: 300px
    object-fit: cover
    padding: 1px
</style>
