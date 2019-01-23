import db, { delay, findById, batchGet } from './mockData'

export default {
  // Book
  async getBooks(args) {
    await delay(1000 * 2)
    return db.books
  },
  async getBookById(id) {
    return findById(db.books, id)
  },
  async batchGetBookByIds(ids = []) {
    return batchGet(db.books, ids, 'id')
  },
  async createBook({ title, author }) {
    await delay(1000 * 2)
    const id = db.books.length + 1
    const book = { id, title, author }
    db.books.push(book)
    return book
  },

  // Author
  async getAuthors(name) {
    await delay(1000 * 2)
    if (name) {
      return db.authors.filter(
        ({ firstName, lastName }) => firstName.indexOf(name) !== -1 || lastName.indexOf(name) !== -1
      )
    }
    return db.authors
  },
  async getAuthorById(id) {
    await delay(1000 * 2)
    return findById(db.authors, id)
  },
  async createAuthor({ firstName, lastName, books }) {
    await delay(1000 * 2)
    const id = db.authors.length + 1
    const author = { id, firstName, lastName, books }
    db.authors.push(author)
    return author
  }
}
