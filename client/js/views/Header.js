const View = require('@futuredays/view')

module.exports = class Header extends View {

    constructor( opts ={} ) {
        super()
        return this.initialize( opts )
    }

    events = { navList: 'click' }

    insertion() { return { el: document.querySelector('#content'), method: 'insertBefore' } }

    onNavListClick(e) {
        if( e.target.tagName !== 'LI' ) return   
        this.emit( 'navigate', `/${e.target.getAttribute('data-name')}` )
    }

    selectNav( name ) {
        if( this.selectedNav ) this.selectedNav.classList.remove('selected')
        this.selectedNav = this.els.navList.querySelector(`li[data-name='${name}']`)
        this.selectedNav.classList.add('selected') 
    }

}
