<template>
  <div v-if="file">
    <img :src="prefixB64(file)" class="w-100" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '../constants/VuexConstants'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      file(state) {
        return state.file.list[this.id]
      },
    }),
  },
  async created() {
    if (this.file === undefined && this.id) {
      await this.$store.dispatch(ACTIONS.GET_FILE, this.id)
    } else {
      this.$destroy()
    }
  },
  methods: {
    prefixB64(b64) {
      return `data:image/jpeg;base64,${b64}`
    },
  },
}
</script>
