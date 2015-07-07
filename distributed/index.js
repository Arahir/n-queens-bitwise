var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var solutionCount = 0;
var stack = [];

setInterval(function() {
  console.log(solutionCount);
}, 1000);
var nQueens = function(n) {
  var done = Math.pow(2, n) - 1 ; // when all columns are filled
  //column = c
  //top-right diagonal = rd
  //bottom-left diagonal = ld
  var _nQueens = function(c, rd, ld) {
    //possible position = p
    var p, pos;
    if(c !== done) {

      p = ~(c | rd | ld) // bits with 1 are places we can put queen

      while(p & done) {
        //extract least significant bit by & with two's complement
        pos = p & -p;
        stack.push([c|pos, (rd|pos) << 1, (ld|pos) >> 1]);
        p -= pos;
      }
    }
  };
  _nQueens(0,0,0);
};

nQueens(15);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('done', function(numSolutions){
    solutionCount += numSolutions;
    var problem = stack.pop();
    console.log('sending: ' + problem);
    io.emit('problem space', problem);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});