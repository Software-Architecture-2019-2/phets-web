import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  session: undefined,
})

export const mutations = {
  setSession(state, session) {
    state.session = session
  },
}

export const actions = {
  load({ commit }) {
    if (process.browser && localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      commit('setSession', { token, username })
      this.$axios.setToken(token, 'Bearer')
    }
  },
  async login({ commit }, login) {
    const fields = ['token']
    const gql = {
      type: 'mutation',
      name: 'login',
      params: [{ name: 'credentials', value: login, type: 'UserCredentials!' }],
      fields,
    }
    const response = await GraphQLUtil.request(this.$axios, gql)
    if (response) {
      if (process.browser) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', login.username)
      }
      commit('setSession', { token: response.token, username: login.username })
      this.$axios.setToken(response.token, 'Bearer')
    } else {
      console.error('Login error')
    }
  },
  async logout({ commit, state }) {
    const gql = {
      type: 'mutation',
      name: 'destroySession',
      params: [
        {
          name: 'token',
          value: { token: state.session.token },
          type: 'TokenInput!',
        },
      ],
    }
    await GraphQLUtil.request(this.$axios, gql)
    commit('setSession', undefined)
    if (process.browser) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
    this.$axios.setToken(false)
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
      return true
    } else {
      console.error('Register error')
    }
    return false
  },
}
