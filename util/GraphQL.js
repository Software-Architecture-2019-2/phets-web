export default class GraphQLUtil {
  static async request(axios, gql, callbackError) {
    const query = GraphQLUtil.buildQuery(gql)
    const variables = GraphQLUtil.buildVariables(gql.params)
    try {
      const response = await axios.$post('', {
        query,
        variables,
      })
      if (response.data) {
        return response.data[gql.name]
      } else {
        throw new Error('Request error')
      }
    } catch (error) {
      console.error(error)
      if (callbackError) callbackError()
    }
  }

  static formatFields(fields) {
    let str = ' '
    if (fields && fields.length) {
      str += '{\n'
      for (const field of fields || []) {
        if (typeof field === 'string') {
          str += `${field}\n`
        } else {
          str += `${field.name}${GraphQLUtil.formatFields(field.fields)}`
        }
      }
      str += '}\n'
    }
    return str
  }

  static buildQuery(gql) {
    let gqlString = `${gql.type} ${gql.name}`
    if (gql.params && gql.params.length) {
      const paramsString = gql.params
        .map((p) => `$${p.name}: ${p.type}`)
        .join(', ')
      gqlString += `(${paramsString})`
    }
    gqlString += ` {\n${gql.name}`
    if (gql.params && gql.params.length) {
      const paramsString = gql.params
        .map((p) => `${p.name}: $${p.name}`)
        .join(', ')
      gqlString += `(${paramsString})`
    }
    gqlString += GraphQLUtil.formatFields(gql.fields)
    gqlString += '}'
    return gqlString
  }

  static buildVariables(params) {
    const vars = {}
    for (const param of params || []) {
      vars[param.name] = param.value
    }
    return vars
  }
}
