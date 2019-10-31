import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  sentSuccess: false,
})

export const mutations = {
  set(state, success) {
    state.sentSuccess = success
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
}
