require('./polyfill')

const User = require('./models/User'),
    router = require('./router'),
    onLoad = new Promise( resolve => window.onload = () => resolve() )

User.on( 'logout', () => router.onLogout() )

Promise.all( [ User.get(), onLoad ] )
.then( () => router.initialize() )
.catch( e => console.log( `Error initializing client -> ${e.stack || e}` ) )
