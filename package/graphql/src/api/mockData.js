import R from 'ramda'

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

export default {
  authors: [
    {
      id: 1,
      firstName: 'liu',
      lastName: 'xuancheng',
      books: [1, 3]
    },
    {
      id: 2,
      firstName: 'dong',
      lastName: 'xiaocong',
      books: [2]
    }
  ],
  books: [
    {
      id: 1,
      title: 'book one',
      author: 1
    },
    {
      id: 2,
      title: 'book two',
      author: 2
    },
    {
      id: 3,
      title: 'book three',
      author: 1
    }
  ]
}
