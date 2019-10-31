import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, notifications) {
    state.list = notifications
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
      params: [
        {
          name: 'username',
          value: this.state.auth.session.username,
          type: 'String!',
        },
      ],
      fields,
    }
    const notifications = await GraphQLUtil.request(this.$axios, gql)
    if (notifications) {
      commit('setList', notifications)
    } else {
      console.error('Not able to load notifications')
    }
  },
}
