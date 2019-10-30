import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  UserNotif: [],
})

export const mutations = {
  setUserNotif(state, UserNotif) {
    state.UserNotif = UserNotif
  },
}

export const actions = {
  async userNotifications({ commit }) {
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
    const UserNotif = await GraphQLUtil.request(this.$axios, gql)
    if (UserNotif) {
      commit('setUserNotif', UserNotif)
    } else {
      console.error('Not able to load notifications')
    }
  },
}
