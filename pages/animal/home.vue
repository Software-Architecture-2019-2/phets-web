<template>
  <div class="container">
    <div>
      <template v-if="own && own.data.length">
        <b-row>
          <b-col
            v-for="(animal, i) in own.data"
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
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </template>
      <b-row v-else>
        <b-col>
          En el momento no tiene mascotas registradas / No se han encontrado
          resultados para la búsqueda
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        id: null,
        name: undefined,
        lastName: undefined,
        username: undefined,
        email: undefined,
        description: undefined,
      },
    }
  },
  computed: {
    profile() {
      console.log(this.$store)
      return this.$store.todo.lists
    },
    ...mapState({
      user: (state) => state.user.current,
      own: (state) => state.animal.own,
    }),
  },
  created() {
    console.log(this)
  },
  methods: {
    search() {
      this.$store.dispatch(ACTIONS.ANIMAL_OWN, this.user.username)
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
      return gender ? 'Masculino' : 'Femenino'
    },
    async toPetProfile(id) {
      await this.$store.dispatch(ACTIONS.ANIMAL_GET, id)
      this.$router.push({ path: '/animal/pet' })
    },
  },
}
</script>

<style>
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
