const ViewFactory = require('./factory/View')

module.exports = Object.create( { ...require('../../lib/MyObject'),
   
    Views: require('./.ViewMap'),

    initialize() {
        this.contentContainer = document.querySelector('#content')

        this.viewFactory = new ViewFactory

        this.header = this.viewFactory.create( 'header', { } )
            .on( 'navigate', route => this.navigate( route ) )

        this.footer = this.viewFactory.create( 'footer', { insertion: { el: document.body } } )
        
        window.onpopstate = this.handle.bind(this)

        this.handle()
    },

    handle() {
        this.handler( window.location.pathname.split('/').slice(1) )
    },

    handler( path ) {
        const name = this.pathToView( path[0] ),
            view = this.Views[ name ] ? name : 'home'

        this.header.selectNav( path[0] || 'home' )

        if( view === this.currentView ) return this.views[ view ].onNavigation( path.slice(1) )

        this.scrollToTop()

        Promise.all( Object.keys( this.views ).map( view => this.views[ view ].hide() ) )
        .then( () => {

            this.currentView = view

            if( this.views[ view ] ) return this.views[ view ].onNavigation( path )

            return Promise.resolve(
                this.views[ view ] =
                    this.viewFactory.create( view, { insertion: { el: this.contentContainer }, path } )
                    .on( 'navigate', ( route, options ) => this.navigate( route, options ) )
                    .on( 'deleted', () => delete this.views[ view ] )
            )
        } )
        .catch( this.Error )
        
        this.footer.els.container.classList.toggle( 'hidden', view === 'Admin' )
    },

    navigate( location, options={} ) {
        if( options.replace || options.up ) {
            let path = `${window.location.pathname}`.split('/')
            path.pop()
            if( options.replace ) path.push( location )
            location = path.join('/')
        }
        else if( options.append ) { location = `${window.location.pathname}/${location}` }

        if( location !== window.location.pathname ) history.pushState( {}, '', location )
        if( !options.silent ) this.handle()
    },

    onLogout() {
        Promise.all( Object.keys( this.views ).map( view => this.views[ view ].delete() ) )
        .then( () => { this.currentView = undefined; return this.handle() } )
        .catch( this.Error )
    },

    pathToView( path ) {
        const hyphenSplit = path.split('-')
        return hyphenSplit.map( item => this.capitalizeFirstLetter( item ) ).join('')
    },

    scrollToTop() {
        window.scroll( { top: 0, left: 0, behavior: 'smooth' } )
    }

}, { currentView: { value: '', writable: true }, views: { value: { } } } )
