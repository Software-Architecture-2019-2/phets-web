<template>
  <b-container fluid class="my-3">
    <b-row>
      <b-col lg="2" md="3" sm="12">
        <b-form @submit.prevent="searchFiltering">
          <b-row align-h="between">
            <b-col cols="auto">
              <span class="h3">
                <font-awesome-icon :icon="['fa', 'filter']" />
                <b>Filtrar</b>
              </span>
            </b-col>
            <b-col cols="auto">
              <b-button
                v-b-tooltip.hover
                title="Buscar"
                size="sm"
                type="submit"
                variant="outline-primary"
              >
                <font-awesome-icon :icon="['fa', 'search']" />
              </b-button>
              <b-button
                v-b-tooltip.hover
                title="Limpiar"
                size="sm"
                variant="outline-warning"
                @click="clean"
              >
                <font-awesome-icon :icon="['fa', 'trash']" />
              </b-button>
            </b-col>
          </b-row>
          <b-form-group
            class="mt-3"
            label="Tipo de animal"
            label-class="font-weight-bold"
          >
            <b-select v-model="filter.animalType" :options="animalTypes" />
          </b-form-group>
          <b-form-group label="Raza" label-class="font-weight-bold">
            <b-input v-model="filter.breed" placeholder="ej: Chihuahua" />
          </b-form-group>
          <b-form-group>
            <slot name="label">
              <b-row class="button-height" align-v="center">
                <b-col class="font-weight-bold">Género</b-col>
                <b-col v-show="filter.gender !== null" cols="auto">
                  <b-button
                    v-b-tooltip.hover
                    title="Eliminar filtro de género"
                    variant="outline-dark"
                    size="sm"
                    pill
                    @click="filter.gender = null"
                  >
                    <font-awesome-icon :icon="['fa', 'times']" />
                  </b-button>
                </b-col>
              </b-row>
            </slot>
            <b-row align-h="between">
              <b-col cols="auto">
                <b-form-radio-group
                  v-model="filter.gender"
                  :options="genderOptions"
                />
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group label="Edad" label-class="font-weight-bold">
            <b-input
              v-model="filterAge"
              type="range"
              min="1"
              max="30"
              step="1"
            />
            <b-row align-h="between">
              <b-col cols="auto">1 año</b-col>
              <b-col v-if="filterAge" class="text-center"
                >{{ filterAge }} o menos</b-col
              >
              <b-col cols="auto">30 años</b-col>
            </b-row>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col>
        <b-row class="h2 font-weight-bold">
          <b-col>Animales en adopción</b-col>
        </b-row>
        <b-row v-if="searching" class="h4">
          <b-col>Resultados de la búsqueda</b-col>
        </b-row>
        <template v-if="animalPage && animalPage.data.length">
          <b-row>
            <b-col
              v-for="(animal, i) in animalPage.data"
              :key="i"
              lg="4"
              md="6"
              sm="12"
              class="mb-4"
            >
              <b-card no-body class="animal-card">
                <file-preview
                  v-if="animal.media.length"
                  :id="animal.media[0]"
                />
                <b-card-img
                  v-else
                  :src="
                    `https://placekitten.com/480/210?image=${Math.floor(
                      Math.random() * 20
                    )}`
                  "
                  alt="Image"
                />
                <!-- TODO: Change for default image -->
                <b-card-body>
                  <b-card-title>
                    <b-link variant="link" @click="toPetProfile(animal.id)">{{
                      animal.name
                    }}</b-link>
                    {{ age(animal.birthdate) }}
                  </b-card-title>
                  <b-card-sub-title>
                    {{ animal.animal_type.value }}, {{ animal.breed }},
                    {{ gender(animal.gender) }}
                  </b-card-sub-title>
                  <b-button
                    v-b-tooltip.hover
                    v-b-modal.sent-message
                    class="send-message-btn"
                    title="Enviar mensaje"
                    type="submit"
                    variant="outline-primary"
                    @click="setInfo(animal.id)"
                    >Enviar mensaje</b-button
                  >
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-pagination
                v-model="paginate.page"
                :per-page="animalPage.perPage"
                :total-rows="animalPage.totalElements"
                align="center"
              />
            </b-col>
          </b-row>
        </template>
        <b-row v-else>
          <b-col>
            En el momento no hay mascotas para adoptar / No se han encontrado
            resultados para la búsqueda
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal id="sent-message" hide-footer title="Enviar mensaje">
      <b-form-input v-model="message.content" type="text"></b-form-input>
      <b-button
        type="submit"
        variant="success"
        style="margin-top: 2%"
        @click="sendMessage()"
        >Enviar</b-button
      >
    </b-modal>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import FilePreview from '~/components/FilePreview'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    FilePreview,
  },
  data() {
    return {
      searching: false,
      genderOptions: [
        { text: 'Masculino', value: false },
        { text: 'Femenino', value: true },
      ],
      filter: {
        animalType: null,
        breed: null,
        gender: null,
        birthdate: null,
        adoption: true,
        notUser: this.$store.state.auth.session.username,
      },
      filterAge: undefined,
      paginate: {
        perPage: 12,
        page: 1,
      },
      message: {
        content: null,
        sent: null,
        received: null,
        adopt: true,
      },
    }
  },
  computed: {
    ...mapState({
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
      animalPage: (state) => state.animal.page,
      username: (state) => state.auth.session.username,
    }),
  },
  watch: {
    paginate: {
      handler() {
        this.search()
      },
      deep: true,
    },
    filterAge(age) {
      this.filter.birthdate = new Date()
      this.filter.birthdate.setFullYear(new Date().getFullYear() - age)
    },
  },
  beforeCreate() {
    this.$store.dispatch(ACTIONS.ANIMAL_TYPES)
  },
  created() {
    this.search()
  },
  methods: {
    searchFiltering() {
      this.searching = true
      this.search()
    },
    search() {
      const pager = { ...this.paginate }
      pager.page--
      this.$store.dispatch(ACTIONS.ANIMAL_PAGE, { pager, filter: this.filter })
    },
    clean() {
      this.filter = {
        gender: null,
        breed: null,
        birthdate: null,
        animalType: null,
        adoption: true,
        notUser: this.$store.state.auth.session.username,
      }
      this.searching = false
      this.search()
    },
    age(birthdate) {
      const birthday = new Date(birthdate)
      const today = new Date()
      let years = today.getFullYear() - birthday.getFullYear()
      let months = today.getMonth() - birthday.getMonth()
      if (today.getMonth() < birthday.getMonth()) {
        months += 12
        years--
      }
      let str = ' '
      if (years) str += `${years} años`
      if (years && months) str += ', '
      if (months) str += `${months} meses`
      return '-' + str
    },
    gender(gender) {
      return gender ? 'Femenino' : 'Masculino'
    },
    async toPetProfile(id) {
      await this.$store.dispatch(ACTIONS.ANIMAL_GET, id)
      this.$router.push({ path: '/animal/pet' })
    },
    setInfo(animal) {
      this.message.received = animal.toString()
    },
    async sendMessage() {
      this.message.sent = this.username

      await this.$store
        .dispatch(ACTIONS.MESSAGE_SENT, this.message)
        .then((res) => {
          this.message.content = ''
          this.$bvModal.hide('sent-message')
        })
    },
  },
}
</script>

<style lang="sass" scoped>
.send-message-btn
  margin-top: 10px
.button-height
  height: 31px

.animal-card
  height: 430px
</style>

<style lang="sass">
.animal-card
  img, .card-img
    height: 300px
    object-fit: cover
    padding: 1px
</style>
