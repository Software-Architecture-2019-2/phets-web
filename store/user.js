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
            'description',
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
    async get({ commit }, username) {
        const fields = [
            'id',
            'name',
            'lastName',
            'username',
            'email',
            'description',
        ]
        const gql = {
            type: 'query',
            name: 'userByUsername',
            params: [{ name: 'username', value: username, type: 'String!' }],
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
            'description',
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
    async edit({ commit }, user) {
        const fields = [
            'id',
            'name',
            'lastName',
            'username',
            'email',
            'description',
        ]
        const gql = {
            type: 'mutation',
            name: 'updateUser',
            params: [{ name: 'user', value: user, type: 'userInput!' }],
            fields,
        }
        const editedUser = await GraphQLUtil.request(this.$axios, gql)
        if (editedUser) {
            console.log('user succesfully edited')
        } else {
            console.error('Error saving user')
        }
    },
}