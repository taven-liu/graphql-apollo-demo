import fs from 'fs'

export default {
  port: 4000,
  token: {
    url: '/token',
    secret: {
      public: fs.readFileSync('rsa-public-key.pem'),
      private: fs.readFileSync('rsa-private.pem')
    },
    expired: '1d'
  },
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  }
}
