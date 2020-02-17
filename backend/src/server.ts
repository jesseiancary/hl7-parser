'use strict'

// import Path from 'path'
// import * as Hapi from 'hapi'
import { Server } from '@hapi/hapi'
import connectDB from '../config/db'
import config from 'config'
import routes from './routes/routes'
import Cookie from '@hapi/cookie'
import CookieAuthStrategy from './plugins/authStrategy'

const server: Server = new Server({
  host: config.get('host'),
  port: process.env.PORT || config.get('port'),
  routes: {
    cors: {
      origin: ['http://localhost:3000'],
      additionalHeaders: [
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
      ],
      credentials: true
    }
  }
})

connectDB()

const init = async () => {

  const cache = server.cache({
    segment: 'sessions',
    expiresIn: 3 * 24 * 60 * 60 * 1000 // Three days
  })
  server.app.cache = cache

  await server.register({ plugin: Cookie })
  server.auth.strategy('session', 'cookie', CookieAuthStrategy)
  server.auth.default('session')

  await server.register(
    routes,
    {
      routes: {
        prefix: '/api'
      }
    }
  )

  await server.start()
  // WHY DOES THIS THROW AN ERROR? CAN I DELETE IT IN LIEU OF THE unhandledRejection LISTENER BELOW?
  // await server.start((err: any) => {
  //   if (err) {
  //     console.log('Error starting backend server.', err)
  //     throw err
  //   }
  // })
  console.log(`Server is listening at ${server.info.uri}`)

}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()