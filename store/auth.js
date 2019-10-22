import { FILE_MS_URI, SERVICES, HTTP_STATUS } from '~/constants/AxiosConstants'

export const state = () => ({
  data: {},
})

export const mutations = {
  set(state, data) {
    state.data = { ...data }
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}

export const actions = {
  async login({ commit }, { username, password }) {
    const URI = `${FILE_MS_URI}${SERVICES.AUTHENTICATE}`
    const body = {
      send_code: {
        login: username,
      },
    }
    try {
      const response = await this.$axios.post(URI, body)
      if (response.status === HTTP_STATUS.OK) {
        console.log('Succesful login!')
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error(error)
    }
  },
}
