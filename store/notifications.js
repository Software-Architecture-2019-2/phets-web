import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  list: [],
})

export const mutations = {
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
}

export const actions = {
  async getList({ commit }) {
    const fields = [
      'id',
      'notification_body',
      'notification_state',
      'notification_type',
    ]
    const gql = {
      type: 'query',
      name: 'userNotifications',
      params: [{ name: 'id', value: 1, type: 'Int!' }],
      fields,
    }
    const notifications = await GraphQLUtil.request(this.$axios, gql)
    if (notifications) {
      commit('setNotifications', notifications)
    } else {
      console.error('Not able to load notifications')
    }
  },
}
