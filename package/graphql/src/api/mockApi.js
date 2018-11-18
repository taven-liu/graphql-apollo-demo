import db, { delay, findById, batchGet }  from './mockData'

export default {
  async getBooks(args) {
    await delay(1000 * 1)
    return db.books
  },
  async getBookById(id) {
    return findById(db.books, id)
  },
  async batchGetBookByIds(ids) {
    return batchGet(db.books, ids, 'id')
  },
  async getAuthors() {
    await delay(1000 * 1)
    return db.authors
  },
  async getAuthorById(id) {
    await delay(1000 * 1)
    return findById(db.authors, id)
  }
}
