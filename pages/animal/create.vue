<template>
  <b-container>
    <h1 class="my-5">Agregar Mascota</h1>

    <b-form @submit.prevent="createPet">
      <b-row>
        <b-col>
          <b-form-group label="Tipo de interacción" label-class="font-weight-bold">
            <b-form-radio-group
              v-model="animalItem.adoption"
              :options="typeOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Nombre" label-class="font-weight-bold">
            <b-input v-model="animalItem.name" placeholder="ej: Firulais" />
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="Tipo de animal" label-class="font-weight-bold">
            <b-select v-model="animalItem.animal_type" :options="animalTypes" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Raza" label-class="font-weight-bold">
            <b-input v-model="animalItem.breed" placeholder="ej: Chihuahua" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Género" label-class="font-weight-bold">
            <b-form-radio-group
              v-model="animalItem.gender"
              :options="genderOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group
            label="Fecha de nacimiento"
            label-class="font-weight-bold"
          >
            <datepicker v-model="animalItem.birthdate" :max-date="new Date()" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Subida de imágenes"
            label-class="font-weight-bold"
          >
            <b-form-file
              v-model="file"
              accept="image/*"
              browse-text="Buscar"
              placeholder="Selecciona un archivo o suéltalo acá..."
              drop-placeholder="Suelta un archivo acá..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-badge
        v-for="(name, i) in filenames"
        :key="i"
        variant="info"
        class="mx-1 text-truncate mw-badge"
      >
        <font-awesome-icon
          :icon="['fa', 'times']"
          @click="files.splice(i, 1)"
        />
        {{ name }}
      </b-badge>

      <b-row class="text-center mt-3">
        <b-col>
          <b-button size="sm" type="submit" variant="outline-primary"
            >Guardar Mascota</b-button
          >
        </b-col>
        <b-col>
          <b-button size="sm" to="/animal/home" variant="outline-primary"
            >Cancelar</b-button
          >
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
      file: undefined,
      files: [],
      animalItem: {
        name: undefined,
        user: this.$store.state.auth.session.username,
        breed: undefined,
        gender: undefined,
        adoption: false,
        birthdate: undefined,
        animal_type: null,
        media: [],
      },
      typeOptions: [
        { text: 'Adopción', value: true },
        { text: 'Phets', value: false },
      ],
      genderOptions: [
        { text: 'Masculino', value: false },
        { text: 'Femenino', value: true },
      ],
    }
  },
  computed: {
    ...mapState({
      animalTypes: (state) => {
        const animalTypes = state.animal.types.map((type) => ({
          value: type,
          text: type.value,
        }))
        animalTypes.unshift({
          disabled: true,
          value: null,
          text: 'Selecciona un tipo',
        })
        return animalTypes
      },
    }),
    filenames() {
      return this.files ? this.files.map((f) => f.name) : undefined
    },
  },
  watch: {
    file(file) {
      if (file) this.files.push(file)
    },
  },
  beforeCreate() {
    this.$store.dispatch(ACTIONS.ANIMAL_TYPES)
  },
  created() {
    this.$store.dispatch(ACTIONS.USER_GET_PROFILE)
  },
  methods: {
    async createPet() {
      for (const file of this.files) {
        const id = await this.$store.dispatch(ACTIONS.UPLOAD_FILE, file)
        this.animalItem.media.push(id)
      }
      const saved = await this.$store.dispatch(
        ACTIONS.ANIMAL_CREATE,
        this.animalItem
      )
      if (saved) this.$router.push('/animal/home')
    },
    gender(gender) {
      return gender ? 'Femenino' : 'Masculino'
    },
  },
}
</script>

<style lang="sass" scoped>
.mw-badge
  max-width: 200px
</style>
