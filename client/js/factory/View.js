const Models = require('../.ModelMap')
const Templates = require('../.TemplateMap')
const Toast = require('@futuredays/toast')
const User = require('../models/User')
const Views = require('../.ViewMap')

module.exports = class Factory {

    constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0))

        this.Toast = new Toast( { range: this.range } )

        return this
    }

    create( name, opts ) {
        const lower = name
        name = ( name.charAt(0).toUpperCase() + name.slice(1) ).replace( '-', '' )

        return new Views[ name ](
            {
                Toast: this.Toast,
                name,
                factory: this,
                range: this.range,
                template: Templates[ name ],
                model: Models[ name ] ? Object.create( Models[ name ] ) : undefined,
                user: User,
                ...opts
            }
        )
    }

}