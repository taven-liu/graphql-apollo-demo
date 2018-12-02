export default {
  port: 4000,
  token: {
    url: '/token',
    secret: 'secret test',
    expired: '1d'
  },
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  }
}
