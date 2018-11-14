const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 },function (){
	console.log('Server porta 8080');
});

// formato socket voto
var voto = new Object();
voto.class = "voto"
voto.candidate = "Gabs";
voto.candidate_id = 12347;
voto.voter = 12345;

// formato socket candidato
var candidate = new Object();
candidate.name = "Gabs";
candidate.id = 12347



wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('Mensagem recebida: %s', message);
  });

  ws.send('Eleicao presidente - Servidor de websockets');
  ws.send(JSON.stringify(voto));
  ws.send(JSON.stringify(candidate));

});