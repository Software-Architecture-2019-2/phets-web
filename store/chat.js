import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  sentSuccess: false,
  active: undefined,
})

export const mutations = {
  setActive(state, active) {
    state.active = active
  },
}

export const actions = {
  async sent({ commit }, message) {
    const fields = ['data']
    const gql = {
      type: 'mutation',
      name: 'createMessage',
      params: [{ name: 'message', value: message, type: 'MessageInput!' }],
      fields,
    }
    const res = await GraphQLUtil.request(this.$axios, gql)
    if (res) {
      console.info('Message sent')
      this.sentSuccess = true
    } else {
      console.error('Message error')
    }
  },
  setActive({ commit }, active) {
    commit('setActive', active)
  },
}
