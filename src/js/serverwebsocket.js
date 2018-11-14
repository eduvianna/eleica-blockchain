const WebSocket = require('ws');

// formato socket voto
var voto = new Object();
voto.class = "voto"
voto.candidate = "Gabs";
voto.candidate_id = 12347;
voto.voter = 12345;

// formato socket candidato
var candidate = new Object();
candidate.class = "add_candidate"
candidate.candidate = "gabstestepqp";
candidate.partie = "PartidoDoGabs"
candidate.idt = 12347
candidate.votes = 0

const wss = new WebSocket.Server({ port: 8080 },function (){
	console.log('Server porta 8080');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('Mensagem recebida: %s', message);
  });

  ws.send(JSON.stringify(voto));
  ws.send(JSON.stringify(candidate));

});