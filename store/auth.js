import { FILE_MS_URI, HTTP_STATUS } from '~/constants/AxiosConstants'

export const state = () => ({
  loginSuccess: false,
})

export const mutations = {
  set(state, success) {
    state.loginSuccess = success
  },
}

export const actions = {
  async login({ commit }, { username, password }) {
    const URI = `${FILE_MS_URI}`
    const body = {
      send_code: {
        login: username,
      },
    }
    let success = false
    try {
      const response = await this.$axios.post(URI, body)
      if (response.status === HTTP_STATUS.OK) {
        success = true
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error(error)
    } finally {
      commit('set', success)
    }
  },
}