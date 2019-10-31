import GraphQLUtil from '~/util/GraphQL'

export const actions = {
  async phet({ commit }, { idFrom, idTo, like }) {
    const fields = ['id', 'idMain', 'idSecondary', 'match1', 'match2']
    const gql = {
      type: 'mutation',
      name: 'createInteraction',
      params: [
        { name: 'id1', value: idFrom, type: 'Int!' },
        { name: 'id2', value: idTo, type: 'Int!' },
        { name: 'state', value: like, type: 'Boolean!' },
      ],
      fields,
    }
    const interaction = await GraphQLUtil.request(this.$axios, gql)
    if (interaction) {
      return interaction
    } else {
      console.error('Not able to interact')
    }
  },
  async getMatchHistory({ commit }, id ) {
    const fields = [     
      'id',
      'idMain',
      'idSecondary',
      'match1',
      'match2'
    ]
    const gql = {
      type: 'query',
      name: 'matchHistory',
      params: [{ name: 'id1', value: id, type: 'Int!' }],
      fields,
    }
    const matchHistory = await GraphQLUtil.request(this.$axios, gql)
    if (matchHistory) {
      return matchHistory
    } else {
      console.error('Not able to load match history')
    }
  },
}
