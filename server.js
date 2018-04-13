const Hapi = require('hapi')
const Vision = require('vision')
const Pug = require('pug')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

const start = async () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  const prod = process.env.NODE_ENV === 'production'

  await server.register(require('inert'))
  await server.register(Vision)

  server.views({
    engines: { pug: Pug },
    relativeTo: __dirname,
    path: 'templates',
    isCached: prod
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
    path: '/ping',
    handler: () => {
      return 'pong'
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

start()
