require('dotenv').config()

const Router = require('./router'),
    httpPort = process.env.HTTP_PORT

module.exports = ( async () => {
    try {
        await Router.initialize()

        require('http').createServer( Router.handler.bind(Router) ).listen( httpPort )

        console.log( `HTTP server listening at ${httpPort}` )
    } catch( e ) { 
        console.log( `Error initializing app: ${e.stack ||e}` )
        process.exit(1);
    }
} )()