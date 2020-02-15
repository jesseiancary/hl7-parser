'use strict'

// import Path from 'path'
// import * as Hapi from 'hapi'
import { Server } from '@hapi/hapi'
import connectDB from '../config/db'
import config from 'config'
import routes from './routes/routes'
import AuthBearer from 'hapi-auth-bearer-token'
import AuthStrategy from './plugins/authStrategy'

const server: Server = new Server({
  host: config.get('host'),
  port: process.env.PORT || config.get('port'),
  routes: {
    // What does this do?
    cors: true
  }
})

connectDB()

const init = async () => {

  await server.register({plugin: AuthBearer})
  server.auth.strategy('simple', 'bearer-access-token', AuthStrategy )
  server.auth.default('simple')

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