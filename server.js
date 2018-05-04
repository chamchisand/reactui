process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const Hapi = require('hapi')
const Vision = require('vision')
const Pug = require('pug')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

server.route(require('./routes/ping'))
server.route(require('./routes/word'))

const start = async () => {
  await server.register(require('inert'))
  await server.register(Vision)

  server.views({
    engines: { pug: Pug },
    relativeTo: __dirname,
    path: 'templates'
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('index')
    }
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

if (!module.parent) {
  start()
}

module.exports = server
