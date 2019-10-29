import { getData, setData } from 'nuxt-storage/local-storage'
import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  session: getData('token') !== undefined
    ? { token: getData('token'), username: getData('username') }
    : undefined,
})

export const mutations = {
  setSession(state, session) {
    state.session = session
  },
}

export const actions = {
  async login({ commit, state }, login) {
    const fields = ['token']
    const gql = {
      type: 'mutation',
      name: 'login',
      params: [{ name: 'credentials', value: login, type: 'UserCredentials!' }],
      fields,
    }
    const { token } = await GraphQLUtil.request(this.$axios, gql)
    if (token) {
      setData('token', token)
      setData('username', login.username)
      commit('setSession', { token, username: login.username })
    } else {
      console.error('Login error')
    }
  },
  async register({ commit }, register) {
    const fields = ['firstName', 'lastName', 'username', 'email', 'password']
    const gql = {
      type: 'mutation',
      name: 'register',
      params: [{ name: 'user', value: register, type: 'UserInput!' }],
      fields,
    }
    const res = await GraphQLUtil.request(this.$axios, gql)
    if (res) {
      console.info('Success registration')
    } else {
      console.error('Register error')
    }
  },
}
