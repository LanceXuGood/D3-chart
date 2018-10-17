const AND = ' AND '
const OR = ' OR '

export default {
  encode: (selecteds) => {
    const results = []
    Object.keys(selecteds).forEach(field => {
      const values = selecteds[field]
      if (values.length === 0) {
        return
      }
      const result = `(${values.map(value => `${field}:"${value.id || value.name}"`).join(OR)})`
      results.push(result)
    })
    return results.join(AND)
  },
  decode: (string, valueFn) => {
    if (!string) return {}
    return string
      .split(AND)
      .map(field => {
        const values = field
          .replace(/^\(|\)$/g, '')
          .split(OR)
          .reduce((data, fvalue) => {
            const [key, value] = fvalue.split(/:/)
            const v = { name: value.replace(/^"|"$/g, '') }
            data[key] = data[key] ? data[key].concat(v) : data[key] = [v]
            return data
          }, {})
        return values
      })
      .reduce((obj, data) => {
        return { ...obj, ...data }
      }, {})
  }
}
