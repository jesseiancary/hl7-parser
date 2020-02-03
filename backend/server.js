'use strict';

// const Path = require('path');
const Hapi = require('hapi');
const connectDB = require('./config/db');
const config = require('config');

const server = new Hapi.Server({
  host: config.get('host'),
  port: process.env.PORT || config.get('port'),
  routes: {
    // What does this do?
    cors: true
  }
});

connectDB();

const init = async () => {

  const routes = require('./routes/routes');
  await server.register(
    routes,
    {
      routes: {
        prefix: '/api'
      }
    }
  );

  await server.start(err => {
    if (err) {
      console.log('Error starting backend server.', err)
      throw err;
    }
  });
  console.log(`Server is listening at ${server.info.uri}`);

}

init();






// hapi-cors example

// const start = async function() {
//   try {
//       await server.register({
//           plugin: require('hapi-cors'),
//           options: {
//               origins: ['http://localhost:3000']
//           }
//       })

//       await server.start();
//   } catch(err) {
//       console.log(err);
//       process.exit(1);
//   }
// };

// start();






// hapi-react-views example

// const Inert = require('@hapi/inert');
// const Vision = require('@hapi/vision');
// const hapiReactViews = require('hapi-react-views');

// require('@babel/register')({
//   presets: ['@babel/preset-react', '@babel/preset-env']
// });
// require('@babel/polyfill');

// await server.register(Vision);

// server.views({
//   engines: {
//     jsx: hapiReactViews
//   },
//   relativeTo: __dirname,
//   path: 'src/views'
// });

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: (request, h) => {
//     return h.view('home', { title: 'Home Page' });
//   }
// });

// server.route({
//   method: 'GET',
//   path: '/about',
//   handler: (request, h) => {
//     return h.view('about', { title: 'About Page' });
//   }
// });