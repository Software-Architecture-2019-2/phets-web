<template>
  <div class="container">
    <div>
      <example-comp />
      <!-- Component usage -->
      <h1 class="title">Página de ejemplo</h1>
      <h2 class="subtitle">Página de ejemplo para desarrollar Phets software system.</h2>
      <!-- Will remove this code if false -->
      <div v-if="pushDiv">Código no mostrado</div>
      <!-- Will set display: none style if false -->
      <div v-show="showDiv">Código oculdato con estilos</div>
      {{ animalList }}
      {{ animalItem }}
      <div class="my-1">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Selecciona un archivo o suéltalo acá..."
          drop-placeholder="Suelta un archivo acá..."
        />
        <b-badge v-for="(name, i) in filenames" :key="i" variant="info" class="mx-1">{{ name }}</b-badge>
      </div>

      <div class="my-1">
        <b-button variant="primary" @click="uploadFiles">Subir archivos a Microservicio</b-button>
        <b-container fluid>
          <b-row>
            <b-col v-for="(fileId, i) in fileIds" :key="i">
              <b-badge variant="info" class="mx-1">{{ fileId }}</b-badge>
              <div class="w-100">
                <file-preview :id="fileId" />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ExampleComp from '~/components/ExampleComp'
import FilePreview from '~/components/FilePreview'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  components: {
    ExampleComp,
    FilePreview,
  },
  props: {
    id: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      pushDiv: false,
      showDiv: false,
      file: undefined,
      files: [],
      fileIds: [],
      array: [1, 2, 3, 4, 5],
    }
  },
  computed: {
    filenames() {
      return this.files ? this.files.map((f) => f.name) : undefined
    },
    ...mapState({
      animalList: (state) => state.animal.list,
      animalItem: (state) => state.animal.item,
    }),
  },
  watch: {
    file(file) {
      if (file) {
        this.files.push(file)
        file = undefined
      }
    },
  },
  created() {
    // this.authenticate('bsavilanr@slabcode.com', 'MYPASS')
    this.$store.dispatch(ACTIONS.ANIMAL_LIST)
    this.$store.dispatch(ACTIONS.ANIMAL_GET, 1)
    // this.$store.dispatch(ACTIONS.ANIMAL_CREATE, {
    //   name: 'Pocky',
    //   user: 'username',
    //   breed: 'Pitbull',
    //   gender: false,
    //   adoption: false,
    //   birthdate: '2013-02-07',
    //   animal_type: {
    //     id: 1,
    //     value: 'Perro',
    //   },
    //   media: [],
    // })
  },
  methods: {
    authenticate(username, password) {
      this.$store.dispatch(ACTIONS.LOGIN, {
        username,
        password,
      })
    },
    async uploadFiles() {
      this.fileIds = []
      for (const file of this.files) {
        const id = await this.$store.dispatch(ACTIONS.UPLOAD_FILE, file)
        this.fileIds.push(id)
      }
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
