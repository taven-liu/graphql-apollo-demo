import fetch from 'isomorphic-fetch'

export default ({ url, method = 'GET', headers = {}, ...others }) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...others
  }).then(response => response.json())
}
