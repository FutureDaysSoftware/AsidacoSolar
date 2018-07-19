module.exports = {

    spotsTaken( division ) {
        const inOrOut = ( division === 'rec' || division === 'int' ) ? `IN` : `NOT IN`
        return this.Postgres.query(
            `SELECT count(*) FROM byop WHERE "divisionId" ${inOrOut} ( $1, $2 ) AND "waitList" = false`,
            [ this.Postgres.divisions.store.name[ 'rec' ].id, this.Postgres.divisions.store.name[ 'int' ].id ]
        )
        .then( ( [ { count } ] ) => Promise.resolve( count ) )
    }
}
