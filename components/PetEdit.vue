<template>
  <div class="dataPet">
    <b-card
      title="Mascota:"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      style="max-width: 30rem;"
      tag="article"
      class="mb-2"
    >
      <b-row>
        <b-form-input id="name-input" v-model="animalItem.name"></b-form-input>
      </b-row>
      <b-row>
        <b-col>Raza:</b-col>
        <b-form-input id="breed-input" v-model="animalItem.breed"></b-form-input>
      </b-row>
      <b-row>
        <b-col>Genero:</b-col>
        <b-form-input id="gender-input" v-model="animalItem.gender"></b-form-input>
      </b-row>
      <b-row>
        <b-col>Fecha de nacimiento:</b-col>
        <b-form-input id="birthdate-input" v-model="animalItem.birthdate"></b-form-input>
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
    this.$store.dispatch(ACTIONS.ANIMAL_GET, this.idAnimal)
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