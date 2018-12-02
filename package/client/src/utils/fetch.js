import fetch from 'isomorphic-fetch'

const apiHeaders = new Headers({
  'Content-Type': 'application/json'
})

export default ({ url, method = 'GET', headers = apiHeaders, ...others }) => {
  return fetch(url, {
    method,
    apiHeaders,
    ...others
  })
}
