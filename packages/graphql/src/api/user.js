import { asyncGet } from './mockUtils'

const USERS = [
  {
    id: 1,
    name: 'taven',
    password: '1234',
    age: 1
  },
  {
    id: 2,
    name: 'niu',
    password: '123',
    age: 1
  }
]

export default {
  getUser(name) {
    return asyncGet(USERS.find(item => item.name === name))
  },
  listUsers() {
    return asyncGet(USERS.concat({ id: 3, name: `Random: ${Math.random().toFixed(3)}`, password: '121', age: 2 }))
  }
}
