var nQueens = function(n) {
  var solutionCount = 0;
  var done = Math.pow(2, n) - 1 ; // when all columns are filled
  //column = c
  //top-right diagonal = rd
  //bottom-left diagonal = ld
  var _nQueens = function(c, rd, ld) {
    //possible position = p
    var p, pos;
    if(c === done) {
      solutionCount++;
    } else {

      p = ~(c | rd | ld) // bits with 1 are places we can put queen

      while(p & done) {
        //extract least significant bit by & with two's complement
        pos = p & -p;
        _nQueens(c|pos, (rd|pos) << 1, (ld|pos) >> 1);
        p -= pos;
      }
    }
  };
  _nQueens(0,0,0);
  return solutionCount;
};