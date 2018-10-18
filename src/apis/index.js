import _ from 'lodash'
import http from './http'

export const getResults = response => _.get(response, 'data.results', [])

export const search = ({ keyword, pq, pfq, iq }) => {
  return http.post('search', { keyword, pq, pfq, iq })
}

export const getQuery = async (queryId) => {
  const response = await http.get(`get_query/${queryId}`)
  return _.get(response, 'data.results.query', {})
}

export const facets = async ({ field, queryId }) => {
  const response = await http.post('facet', { field, queryId })
  const str = _.get(response, 'data.results.facets', '[]')
  const facets = JSON.parse(str)
  return facets[0].values
}

export const $problemRefSolution = async ({ version, queryId, facetLimit = 20 }) => {
  const response = await http.post(`problem/ref/solution/${version}`, { queryId, facetLimit })
  const responseData = _.get(response, 'data.results', [])
  const { x, y, data, xName, yName } = responseData
  const newData = data.map((row, r) => {
    return row.map((value, c) => {
      if (value === 0) {
        return { value }
      }
      const iq = `${yName}:"${y[r]}" AND ${xName}:"${x[c]}"`
      return { value, iq }
    })
  })
  return { x, y, data: newData, xName, yName }
}

export const evolutionary = async ({ queryId, facetLimit = 50 }) => {
  const response = await http.post('evolution', { queryId, facetLimit })
  const data = _.get(response, 'data.results', [])
  return [data.map(({ name: axis, count: value }) => {
    const iq = `EVOLUTION_TYPE:"${axis}"`
    let val = axis
    if (axis === 'Liquidtospray') {
      val = 'Liquid to spray'
    } else if (axis === 'Liquidtofoam') {
      val = 'Liquid to foam'
    }
    return { iq, axis: val, value }
  })]
}

export const elements = async ({ queryId, facetLimit = 20 }) => {
  const response = await http.post('periodic', { queryId, facetLimit })
  const data = _.get(response, 'data.results', [])
  return data.map((record) => {
    const iq = `ELEMENT:"${record.name}"`
    return { iq, ...record }
  })
}
