import { ACTIONS } from '~/constants/VuexConstants'

export default function({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response) {
      const code = parseInt(error.response && error.response.status)
      if (code === 403) {
        store.dispatch(ACTIONS.LOGOUT)
      }
    } else {
      console.error('Unable to connect to server.')
    }
  })
}
