var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    },
    useNullAsDefault: true
});


function select() {
    let selectResult
    selectResult = knex.select("*").from("Candidates")
    selectResult.then(function (rows) {
        console.log(rows)
    })
}

function insert() {
    let insert = knex("Candidates").insert({ Id: 1, Name: 'Carl', Votes: 22, Partie: 'asd' })
        .then(function (id) {
            console.log ('insert ok')
        })
}
insert()
select()
