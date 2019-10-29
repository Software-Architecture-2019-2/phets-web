import { FILE_MS_URI, HTTP_STATUS } from '~/constants/AxiosConstants'

export const actions = {
  // Retrieves a file with an id from Microservice
  get({ commit }, id) {
    return FILE_MS_URI + id
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
