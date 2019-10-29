<template>
  <img :src="path" class="w-100" />
</template>

<script>
import { ACTIONS } from '../constants/VuexConstants'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return { path: undefined }
  },
  async created() {
    this.path = await this.$store.dispatch(ACTIONS.GET_FILE_PATH, this.id)
  },
}
</script>
