import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  list: [],
  item: undefined,
})

export const mutations = {
  setList(state, animals) {
    state.list = animals
  },
  set(state, animal) {
    state.item = animal
  },
}

export const actions = {
  async getList({ commit }) {
    const fields = [
      'id',
      'name',
      'user',
      'breed',
      'gender',
      'adoption',
      'birthdate',
      { name: 'animal_type', fields: ['id', 'value'] },
      'media',
    ]
    const gql = {
      type: 'query',
      name: 'allAnimals',
      fields,
    }
    const animalList = await GraphQLUtil.request(this.$axios, gql)
    if (animalList) {
      commit('setList', animalList)
    } else {
      console.error("Not able to load animals")
    }
  },
  async get({ commit }, id) {
    const fields = [
      'id',
      'name',
      'user',
      'breed',
      'gender',
      'adoption',
      'birthdate',
      { name: 'animal_type', fields: ['id', 'value'] },
      'media',
    ]
    const gql = {
      type: 'query',
      name: 'animalById',
      params: [{ name: 'id', value: id, type: 'Int!' }],
      fields,
    }
    const animal = await GraphQLUtil.request(this.$axios, gql)
    if (animal) {
      commit('set', animal)
    } else {
      console.error("Not able to load animal")
    }
  },
  async create({ commit }, animal) {
    const fields = [
      'id',
      'name',
      'user',
      'breed',
      'gender',
      'adoption',
      'birthdate',
      { name: 'animal_type', fields: ['id', 'value'] },
      'media',
    ]
    const gql = {
      type: 'mutation',
      name: 'createAnimal',
      params: [{ name: 'animal', value: animal, type: 'AnimalInput!' }],
      fields,
    }
    const savedAnimal = await GraphQLUtil.request(this.$axios, gql)
    if (savedAnimal) {
      console.log('Pet succesfully saved')
    } else {
      console.error("Error saving animal")
    }
  },
}
