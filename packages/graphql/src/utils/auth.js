export const getJwtToken = function(req) {
  console.log('-----xxxxxxxxxxxx')
  const parts = req.headers.authorization.split(' ')
  let token
  if (parts.length === 2) {
    const scheme = parts[0]
    const credentials = parts[1]
    if (/^Bearer$/i.test(scheme)) {
      token = credentials
    }
  }
  return token
}
