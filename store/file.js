import Vue from 'vue'
import { FILE_MS_URI, HTTP_STATUS } from '~/constants/AxiosConstants'

export const state = () => ({
  list: {},
})

export const mutations = {
  set(state, { id, file }) {
    Vue.set(state.list, id, file)
  },
}

export const actions = {
  // Retrieves a file with an id from Microservice
  async get({ commit }, id) {
    const url = `${id}`
    try {
      const response = await this.$axios({
        url,
        baseURL: FILE_MS_URI,
        responseType: 'arraybuffer',
      })
      if (response.status === HTTP_STATUS.OK) {
        const buffer = Buffer.from(response.data, 'binary')
        const b64 = buffer.toString('base64')
        commit('set', {
          id,
          file: b64,
        })
      } else {
        throw new Error('Unable to load file')
      }
    } catch (error) {
      console.error(error)
    }
  },
  // Uploads a file to corresponding Microservice
  async upload({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    }
    try {
      const response = await this.$axios({
        method: 'post',
        baseURL: FILE_MS_URI,
        data: formData,
        config,
      })
      if (response.status === HTTP_STATUS.CREATED) {
        return response.data.file_id
      } else {
        throw new Error('Unable to load file')
      }
    } catch (error) {
      console.error(error)
    }
  },
}
