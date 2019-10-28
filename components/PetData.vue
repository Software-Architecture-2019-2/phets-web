<template>
  <div class="dataPet">
    <b-card
      v-if="animalItem"
      title="Mascota:"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      style="max-width: 30rem;"
      tag="article"
      class="mb-2"
    >
      <b-row>
        <h2>{{ animalItem.name }}</h2>
      </b-row>
      <b-row>
        <b-col>Raza:</b-col>
        <b-col>{{ animalItem.breed }}</b-col>
      </b-row>
      <b-row>
        <b-col>Genero:</b-col>
        <b-col>{{ animalItem.gender }}</b-col>
      </b-row>
      <b-row>
        <b-col>Fecha de nacimiento:</b-col>
        <b-col>{{ animalItem.birthdate }}</b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ACTIONS } from '~/constants/VuexConstants'

export default {
  props: {
    idAnimal: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    profile() {
      return this.$store.state.todos
    },
    ...mapState({
      animalItem: (state) => state.animal.item,
    }),
  },
  created() {
    if (this.idAnimal) {
      this.$store.dispatch(ACTIONS.ANIMAL_GET, this.idAnimal)
    } else if (this.animalItem === undefined) {
      this.$router.go(-1)
    }
  },
}
</script>

<style>
@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}
@keyframes godown {
  100% {
    top: 180px;
  }
}
@keyframes goright {
  100% {
    left: 70px;
  }
}
</style>