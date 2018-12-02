import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
  // headers: {
  //   authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhdmVuIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE1NDM5Mzg5MjEsImV4cCI6MTU0NDAyNTMyMX0.6pHVngsOA2sBe3aRni4I2nDgx-REMd2R3q0figbI5eY'
  // }
})

export default client
