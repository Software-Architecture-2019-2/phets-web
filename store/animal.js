import { HTTP_STATUS } from '~/constants/AxiosConstants'

export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, animals) {
    state.list = animals
  },
}

export const actions = {
  async getList({ commit }) {
    const query = `query {
      allAnimals {
        id
        name
        user
        breed
        gender
        adoption
        birthdate
        animal_type {
          id
          value
        }
        media
      }
    }`
    try {
      const response = await this.$axios.post('', { query })
      if (response.status === HTTP_STATUS.OK) {
        commit('setList', response.data.allAnimals)
      } else {
        throw new Error('Error retrieving animal list')
      }
    } catch (error) {
      console.error(error)
    }
  },
}
