import GraphQLUtil from '~/util/GraphQL'

export const state = () => ({
    list: [],
    current: undefined,
})

export const mutations = {
    setList(state, users) {
        state.list = users
    },
    set(state, user) {
        state.item = user
    },
}

export const actions = {
    async getList({ commit }) {
        const fields = [
            'id',
            'name',
            'lastName',
            'username',
            'email',
        ]
        const gql = {
            type: 'query',
            name: 'allUsers',
            fields,
        }
        const userList = await GraphQLUtil.request(this.$axios, gql)
        if (userList) {
            commit('setList', userList)
        } else {
            console.error('Not able to load users')
        }
    },
    async get({ commit }, id) {
        const fields = [
            'id',
            'name',
            'lastName',
            'username',
            'email',
        ]
        const gql = {
            type: 'query',
            name: 'userById',
            params: [{ name: 'id', value: id, type: 'Int!' }],
            fields,
        }
        const user = await GraphQLUtil.request(this.$axios, gql)
        if (user) {
            commit('set', user)
        } else {
            console.error('Not able to load user')
        }
    },
    async create({ commit }, user) {
        const fields = [
            'id',
            'name',
            'lastName',
            'username',
            'email',
        ]
        const gql = {
            type: 'mutation',
            name: 'createUser',
            params: [{ name: 'user', value: user, type: 'userInput!' }],
            fields,
        }
        const savedUser = await GraphQLUtil.request(this.$axios, gql)
        if (savedUser) {
            console.log('user succesfully saved')
        } else {
            console.error('Error saving user')
        }
    },
}