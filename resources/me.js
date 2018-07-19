module.exports = Object.assign( { }, require('./__proto__'), {

    apply( method ) {
        return this.getUser().then( () => this.respond( { body: this.user } ) )
    }

} )
