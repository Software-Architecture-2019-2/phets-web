import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  types: [],
  list: [],
  page: undefined,
  own: [],
  item: undefined,
})

export const mutations = {
  setTypes(state, types) {
    state.types = types
  },
  setList(state, animals) {
    state.list = animals
  },
  setPage(state, animalPage) {
    state.page = animalPage
  },
  setOwn(state, animals) {
    state.own = animals
  },
  set(state, animal) {
    state.item = animal
  },
}

export const actions = {
  async getTypes({ commit }) {
    const fields = ['id', 'value']
    const gql = {
      type: 'query',
      name: 'allAnimalTypes',
      fields,
    }
    const animalTypes = await GraphQLUtil.request(this.$axios, gql)
    if (animalTypes) {
      commit('setTypes', animalTypes)
    } else {
      console.error('Not able to load animal types')
    }
  },
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
  async getPhets({ commit }, animal) {
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
    const filter = {
      animalId: animal,
      username: this.state.auth.session.username,
    }
    const gql = {
      type: 'query',
      name: 'allPhets',
      params: [{ name: 'filter', value: filter, type: 'PhetsFilter!' }],
      fields,
    }
    const animalList = await GraphQLUtil.request(this.$axios, gql)
    if (animalList) {
      commit('setList', animalList)
    } else {
      console.error('Not able to load animals')
    }
  },
  async getFilteredPage({ commit }, { filter, pager }) {
    const fields = [
      {
        name: 'data',
        fields: [
          'id',
          'name',
          'user',
          'breed',
          'gender',
          'adoption',
          'birthdate',
          'media',
          { name: 'animal_type', fields: ['id', 'value'] },
        ],
      },
      'perPage',
      'page',
      'totalElements',
    ]
    // Removes null values from obj
    filter = Object.entries(filter)
      .filter((entry) => entry[1] !== null)
      .reduce((accumulator, current) => {
        accumulator[current[0]] = current[1]
        return accumulator
      }, {})
    const gql = {
      type: 'query',
      name: 'allAnimalsPaged',
      params: [
        { name: 'pagination', value: pager, type: 'Pagination!' },
        { name: 'filter', value: filter, type: 'AnimalFilter' },
      ],
      fields,
    }
    const animalPage = await GraphQLUtil.request(this.$axios, gql)
    if (animalPage) {
      commit('setPage', animalPage)
    } else {
      console.error('Not able to load animals')
    }
  },
  async getOwn({ commit }) {
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
      name: 'allAnimalsByUser',
      params: [
        {
          name: 'username',
          value: this.state.auth.session.username,
          type: 'String!',
        },
      ],
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
      return animal
    } else {
      console.error('Not able to load animal')
    }
  },
  async create({ commit }, animal) {
    const fields = [
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
      return savedAnimal
    } else {
      console.error('Error saving animal')
    }
    return false
  },
  async edit({ commit }, animal) {
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
      name: 'updateAnimal',
      params: [{ name: 'animal', value: animal, type: 'AnimalInput!' }],
      fields,
    }
    const savedAnimal = await GraphQLUtil.request(this.$axios, gql)
    if (savedAnimal) {
      console.info('Pet succesfully edited')
    } else {
      console.error('Error editing animal')
    }
  },
}
