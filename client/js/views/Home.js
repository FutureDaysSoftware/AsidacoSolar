const View = require('@futuredays/view')

module.exports = class Home extends View {

    constructor( opts ={} ) {
        super()
        return this.initialize( opts )
    }

    events = { link: 'click' }

    onLinkClick( e ) {
        this.emit( 'navigate', `/${e.target.getAttribute('data-link')}` )
    }

}