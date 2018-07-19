#!/usr/bin/env node

Object.create( Object.assign( require('../lib/MyObject'), {
    
    Fs: require('fs'),

    filterFile( name ) { return !/^[\._]/.test(name) && /\.js/.test(name) },
    requireFile( path, name ) {
        name = name.replace('.js','')
        return `${name}: require('./${path}/${name}')`
    },

    model: [
        { path: 'views', requirePath: './views', outFile: '.ViewMap.js' },
        { path: 'views/templates', outFile: '.TemplateMap.js' },
        { path: 'models', outFile: '.ModelMap.js' },
        //{ path: 'views/templates/lib', outFile: '.IconMap.js' },
    ],

    constructor( dir ) {

        Promise.all(
            this.model.map( datum =>
                this.P( this.Fs.readdir, [ `${dir}/${datum.path}` ] )
                .then( ( [ files ] ) => 
                    this.P(
                        this.Fs.writeFile,
                        [
                            `${dir}/${datum.outFile}`,
                            `module.exports={\n\t ${files.filter( this.filterFile ).map( this.requireFile.bind( this, datum.path ) ).join(',\n\t')} \n}`
                        ]
                    )
                )
            )
        )
    }

} ) ).constructor( `${__dirname}/../client/js` )
