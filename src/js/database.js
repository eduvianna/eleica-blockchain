var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    },
    useNullAsDefault: true
});


function selectAll() {
    let selectResult
    selectResult = knex.select("*").from("Candidates")
    selectResult.then(function (rows) {
        console.log(rows)
    })
}

function selectCandidate(candidate){
    let selectResult
    selectResult = knex.select("*").where({Name:candidate}).from("Candidates")
    selectResult.then(function (rows) {
        console.log(rows)
    })
}

function insert(candidate, partie, id, votes) {
    let insert = knex("Candidates").insert({ Id: id, Name: candidate, Votes: votes, Partie: partie })
        .then(function (id) {
            console.log ('inserted')
        })
}

function update(candidate, votes){
    let update = knex("Candidates").where({ Name:candidate }).update({ Votes: votes })
    .then(function (id) {
        console.log ('updated')
    })
}

function deleteCandidate(candidate){
    let deleteCandidate
    deleteCandidate = knex.delete("*").where({Name:candidate}).from("Candidates")
    .then(function (id) {
        console.log ('deleted')
    })
}

//insert("Ronaldo", "Brasil", 9,0)
//selectAll()
//update("Ronaldo", 9)
//selectCandidate("Ronaldo")
//deleteCandidate("Ronaldo")