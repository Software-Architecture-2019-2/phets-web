import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
  list: [],
  item: undefined,
})

export const mutations = {
  setList(state, events) {
    state.list = events
  },
  set(state, event) {
    state.item = event
  },
}

export const actions = {
  async getList({ commit }) {
    const fields = ['id', 'subject', 'description', 'date', 'animal_id']
    const gql = {
      type: 'query',
      name: 'allEventsByUser',
      params: [
        {
          name: 'username',
          value: this.state.auth.session.username,
          type: 'String!',
        },
      ],
      fields,
    }
    const data = await GraphQLUtil.request(this.$axios, gql)
    if (data) {
      commit('setList', data)
    } else {
      console.error('Not able to load events')
    }
  },
  async get({ commit }, id) {
    const fields = ['id', 'subject', 'description', 'date', 'animal_id']
    const gql = {
      type: 'query',
      name: 'eventById',
      params: [{ name: 'id', value: id, type: 'String!' }],
      fields,
    }
    const event = await GraphQLUtil.request(this.$axios, gql)
    if (event) {
      commit('set', event)
    } else {
      console.error('Not able to load event')
    }
  },
  reset({ commit }) {
    commit('set', undefined)
  },
  async save({ commit }, { id, event }) {
    const fields = ['id', 'subject', 'description', 'date', 'animal_id']
    const gql = {
      type: 'mutation',
      name: 'createEvent',
      params: [{ name: 'event', value: event, type: 'EventInput!' }],
      fields,
    }
    if (id) {
      const params = [...gql.params]
      params.unshift({ name: 'id', value: id, type: 'String!' })
      Object.assign(gql, { name: 'updateEvent', params })
    }
    const savedEvent = await GraphQLUtil.request(this.$axios, gql)
    return Boolean(savedEvent)
  },
  async delete({ commit }, id) {
    const fields = ['id', 'subject', 'description', 'date', 'animal_id']
    const gql = {
      type: 'mutation',
      name: 'deleteEvent',
      params: [{ name: 'id', value: id, type: 'String!' }],
      fields,
    }
    const deletedEvent = await GraphQLUtil.request(this.$axios, gql)
    return Boolean(deletedEvent)
  },
}
