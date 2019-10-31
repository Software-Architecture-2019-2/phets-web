<template>
  <b-container>
    <b-row class="my-5 h2 font-weight-bold home-title">
      <b-col>Mis mascotas</b-col>
      <b-col cols="auto">
        <b-button to="/animal/create" variant="primary"
          >Agregar Mascota</b-button
        >
      </b-col>
    </b-row>
    <b-card v-if="own && own.length" no-body class="w-100">
      <b-tabs card>
        <b-tab class="home-tab" title="Adopción" active>
          <b-row>
            <b-col
              v-for="(animal, i) in own"
              :key="i"
              lg="4"
              md="6"
              sm="12"
              class="mb-4"
              :style="[
                animal.adoption ? { display: 'visible' } : { display: 'none' },
              ]"
            >
              <b-card v-if="animal.adoption" no-body class="animal-card">
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
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab class="home-tab" title="Phets">
          <b-row>
            <b-col
              v-for="(animal, i) in own"
              :key="i"
              lg="4"
              md="6"
              sm="12"
              class="mb-4"
              :style="[
                !animal.adoption ? { display: 'visible' } : { display: 'none' },
              ]"
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
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-row v-else class="home-else">
      <b-col>En el momento no tiene mascotas registradas</b-col>
    </b-row>
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
  computed: {
    profile() {
      return this.$store.todo.lists
    },
    ...mapState({
      user: (state) => state.user.current,
      own: (state) => state.animal.own,
    }),
  },
  created() {
    this.$store.dispatch(ACTIONS.USER_GET_PROFILE)
    this.$store.dispatch(ACTIONS.ANIMAL_OWN)
  },
  methods: {
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
      return gender ? 'Masculino' : 'Femenino'
    },
    async toPetProfile(id) {
      await this.$store.dispatch(ACTIONS.ANIMAL_GET, id)
      this.$router.push({ path: '/animal/pet' })
    },
  },
}
</script>
