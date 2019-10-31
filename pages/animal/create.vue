<template>
  <div class="container">
    <div class="text-left">
      <h1>Agregar Mascota</h1>

      <b-form @submit.prevent="createPet">
        
        <b-form-group label="Nombre" label-class="font-weight-bold">
          <b-input v-model="animalItem.name" placeholder="ej: Firulais" />
        </b-form-group>

        <b-form-group
          class="mt-3"
          label="Tipo de animal"
          label-class="font-weight-bold"
        >
          <b-select v-model="animalItem.animal_type" :options="animalTypes" />
        </b-form-group>

        <b-form-group label="Raza" label-class="font-weight-bold">
          <b-input v-model="animalItem.breed" placeholder="ej: Chihuahua" />
        </b-form-group>

        <b-form-group>
          <slot name="label">
            <b-row class="button-height" align-v="center">
              <b-col class="font-weight-bold">Género</b-col>
              <b-col v-show="animalItem.gender !== null" cols="auto">
              </b-col>
            </b-row>
          </slot>
          <b-row align-h="between">
            <b-col cols="auto">
              <b-form-radio-group
                v-model="animalItem.gender"
                :options="genderOptions"
              />
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group label="Fecha de nacimiento" label-class="font-weight-bold">
          <b-row>
            Mes:
            <b-form-input
              id="month-input"
              v-model="this.month"
            ></b-form-input>
            Año:
            <b-form-input
              id="year-input"
              v-model="this.year"
            ></b-form-input>
          </b-row>
        </b-form-group>

        <b-row>
          <b-col>
            <b-button 
              size="sm"
              type="submit"
              variant="outline-primary">
              Guardar Mascota</b-button>
          </b-col>
        </b-row>
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
      month: 1,
      year: 2019,
      idAnimal: this.$route.params.id,
      animalItem: {
        name: '',
        user: '',
        breed: '',
        gender: '',
        adoption: false,
        birthdate:  new Date(),
        animal_type: ['id', 'value'],
      },
      genderOptions: [
        { text: 'Masculino', value: false },
        { text: 'Femenino', value: true },
      ],
    }
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.user.current,
      animalTypes: (state) => {
        const animalTypes = state.animal.types.map((type) => ({
          value: type.id,
          text: type.value,
        }))
        animalTypes.unshift({
          value: null,
          text: 'Selecciona un tipo',
        })
        return animalTypes
      },
    }),
  },
  beforeCreate() {
    this.$store.dispatch(ACTIONS.ANIMAL_TYPES)
  },
  created() {
    this.$store.dispatch(ACTIONS.USER_GET_PROFILE)
  },
  methods: {
    createPet() {
      this.animalItem.user = this.currentUser.username
      console.log(this.animalItem)
      this.birthday()
      this.$store.dispatch(ACTIONS.ANIMAL_CREATE, this.animalItem)
      this.$router.push({ path: '/animal/home' })
    },
    birthday() {
      const birthday = new Date()
      birthday.setMonth = this.month
      birthday.setFullYear = this.year
      this.animalItem.birthdate = birthday
    },
    gender(gender) {
      return gender ? 'Femenino' : 'Masculino'
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
