import * as R from 'ramda'

export const delay = (ms, d = true) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(d), ms)
  })
}
export const findById = (s, id) => R.find(R.propEq('id', id))(s)

export const batchGet = (s, values, key) =>
  R.filter(item => {
    console.log(values)
    console.log(item)
    return values.indexOf(item[key]) !== -1
  }, s)

export function getDataArray(props, count = 50) {
  const data = []
  for (let i = 0; i < count; i++) {
    const item = {}
    props.forEach(prop => {
      if (Array.isArray(prop)) {
        const p = prop[0]
        const fn = prop[1]
        item[p] = fn(i)
      } else {
        item[prop] = `${prop} --- ${i}`
      }
    })
    data.push(item)
  }
  return data
}

export const getDataWithPage = (data, offset = 0, limit = 10) => {
  const startIndex = offset
  const endIndex = offset + limit

  const splitItems = data.slice(startIndex, endIndex)

  const result = {
    items: splitItems,
    pageInfo: {
      hasNext: endIndex < data.length - 1,
      hasPrevious: startIndex !== 0,
      totalCount: data.length,
      currentOffset: endIndex - 1
    }
  }
  return result
}

export function asyncGet(data, ms = 800) {
  return delay(Math.random() * ms, data)
}
