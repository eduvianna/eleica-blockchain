const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

// ate que eu aprendo export
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

// websocket

ws.on('open', function open() {
  ws.send('Sistema de Backup Banco de dados');
});

ws.on('message', function incoming(data) {
  message = JSON.parse(data);
  if (message.class === 'add_candidate'){
    insert(message.candidate, message.partie, message.idt, message.votes);
  }
  else{
    let vote_value = 0
    selectResult = knex.select("Votes").where({Name:message.candidate}).from("Candidates")
    selectResult.then(function (rows) {
        voto = JSON.stringify(rows)
        voto = voto.slice(1, voto.length - 1)
        vote_value = JSON.parse(voto).Votes +1;
        update(message.candidate, vote_value)  
    })
  }
});
