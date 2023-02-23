import { isNil } from 'ramda'
import { getDataArray, findById, getDataWithPage, asyncGet } from './mockUtils'

const AUTHORS = getDataArray(
  [
    ['id', i => i],
    'firstName',
    'lastName',
    [
      'books',
      i => {
        if (i === 0) {
          return [1, 3]
        } else if (i === 2) {
          return [2]
        }
        return []
      }
    ]
  ],
  20
)

export default {
  async listAuthors(pageInfo, name) {
    const { offset, limit } = pageInfo
    const allItems = isNil(name)
      ? AUTHORS
      : AUTHORS.filter(({ firstName, lastName }) => {
          const lowerCaseName = name.toLowerCase()
          return firstName.toLowerCase().includes(lowerCaseName) || lastName.toLowerCase().includes(lowerCaseName)
        })

    return asyncGet(getDataWithPage(allItems, offset, limit))
  },

  async getAuthorById(id) {
    return asyncGet(findById(AUTHORS, id))
  },
  async createAuthor({ firstName, lastName, books }) {
    const id = AUTHORS.length + 1
    const author = { id, firstName, lastName, books }
    AUTHORS.push(author)
    return asyncGet(author)
  }
}
