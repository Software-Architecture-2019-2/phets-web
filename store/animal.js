import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  list: [],
  own: [],
  item: undefined,
})

export const mutations = {
  setList(state, animals) {
    state.list = animals
  },
  setOwn(state, animals) {
    state.own = animals
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
      console.error('Not able to load animals')
    }
  },
  async getOwn({ commit }, username) {
    const fields = ['id', 'name']
    const gql = {
      type: 'query',
      name: 'allAnimalsByUser',
      params: [{ name: 'username', value: username, type: 'String!' }], // TODO: Change for session user
      fields,
    }
    const animalList = await GraphQLUtil.request(this.$axios, gql)
    if (animalList) {
      commit('setOwn', animalList)
    } else {
      console.error('Not able to load own animals')
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
      console.error('Not able to load animal')
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
      console.info('Pet succesfully saved')
    } else {
      console.error('Error saving animal')
    }
  },
}
