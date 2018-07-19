module.exports = Object.create( Object.assign( {}, require('../../lib/MyObject'), {
    
    Stripe: require('stripe')( process.env.STRIPE_KEY ),

    charge( data ) {
        return this.P( this.Stripe.charges.create, [ Object.assign( { currency: 'USD' }, data ) ], this.Stripe.charges )
        .then( ( [ charge ] ) => Promise.resolve( charge ) )
    },

    refund( charge ) {
        return this.P( this.Stripe.refunds.create, [ { charge } ], this.Stripe.refunds )
        .then( ( [ refund ] ) => Promise.resolve( refund ) )
    }

} ), { } )
