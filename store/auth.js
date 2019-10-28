import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  loginSuccess: false,
  registerSuccess: false,
})

export const mutations = {
  set(state, success) {
    state.loginSuccess = success
  },
}

export const actions = {
  async login({ commit }, login) {
    const fields = ['token']
    const gql = {
      type: 'mutation',
      name: 'login',
      params: [{ name: 'credentials', value: login, type: 'UserCredentials!' }],
      fields,
    }
    const res = await GraphQLUtil.request(this.$axios, gql)
    if (res) {
      console.info('Success')
      this.loginSuccess = true
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
      console.info('Success')
      this.registerSuccess = true
    } else {
      console.error('Login error')
    }
  },
}
