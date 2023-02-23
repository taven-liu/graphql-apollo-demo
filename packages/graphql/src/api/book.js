import { getDataArray, asyncGet, batchGet, findById } from './mockUtils'

const BOOKS = getDataArray(
  [
    ['id', i => i],
    'title',
    [
      'author',
      i => {
        return i % 4
      }
    ]
  ],
  20
)

export default {
  listBooks() {
    return asyncGet(BOOKS)
  },
  getBookById(id) {
    return asyncGet(findById(BOOKS, id))
  },
  batchGetBookByIds(ids = []) {
    return asyncGet(batchGet(BOOKS, ids, 'id'))
  },
  createBook({ title, author }) {
    const id = BOOKS.length
    const book = { id, title, author }
    BOOKS.push(book)
    return asyncGet(book)
  }
}
