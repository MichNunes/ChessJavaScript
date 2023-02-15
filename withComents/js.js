  const body = document.body;
  const chessboard = document.querySelector('.chessboard');

  //used in a lot of functions. when called to apply value, the value will be the last square clicked on the board.
  let lastElement;
  //

  //when any check is happening, this variable will be the only possible movements that are able to be done on that turn. if there's none, it's checkmate
  let onlyPossibleMovements = [];
  //

  //the point of view in the board. by default is white, you can change removing the // on blackView() call.
  //--------------------------------by default, white move will be the first, you can change removing the // on blackMove() call.
  //will be used for the calculations of the pawn movements
  let view = "";
  //

  //creats the HTML board adding all classlist that will be used as parameters and the color for each square.
  var count = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      const diagRight = row + col + 1;
      const diagLeft = row - col + 8;
      square.classList.add('square', `${row}r`, `${col}c`, `${diagLeft}dl`, `${diagRight}dr`, `${count}`);
      count++;
      if ((row + col) % 2 === 0) {
        square.style.backgroundColor = '#ffffff';
      } else {
        square.style.backgroundColor = '#333333';
      }
      chessboard.appendChild(square);
    }
  }
  //

  //array higly used, with squares[n] you select each individual square.
  const squares = chessboard.querySelectorAll('.square');
  //

  //when a piece is clicked its highlited in yellow each possible movement, the call of this function will reset default board color.
  function resetBoardColor(){
    for (const element of squares) {
      let row = parseInt(element.classList[1].charAt(0));
      let col = parseInt(element.classList[2].charAt(0));
      if ((row + col) % 2 === 0) {
        element.style.backgroundColor = '#ffffff';
      } else {
        element.style.backgroundColor = '#333333';
      }
    };
  }
  //

  //pieces.color.piece will return the character of the piece, mostly used to compare square.textContent, since the pieces are texts and not real objects
  const pieces = {
    white: {
      king: '♔',
      queen: '♕',
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙',
    },
    black: {
      king: '♚',
      queen: '♛',
      rook: '♜',
      bishop: '♝',
      knight: '♞',
      pawn: '♟',
    },
  };
  //

  //used on function anyBlackPiece()
  var allBlackPieces = [
    pieces.black.pawn, 
    pieces.black.rook, 
    pieces.black.knight, 
    pieces.black.bishop, 
    pieces.black.queen, 
    pieces.black.king
  ]
  //

  //used on function anyWhitePiece()
  var allWhitePieces = [
    pieces.white.pawn, 
    pieces.white.rook, 
    pieces.white.knight, 
    pieces.white.bishop, 
    pieces.white.queen, 
    pieces.white.king
  ]
  //

  //set the board with white point of view
  function whiteView(){
    squares[0].textContent = pieces.black.rook;
    squares[1].textContent = pieces.black.knight;
    squares[2].textContent = pieces.black.bishop;
    squares[3].textContent = pieces.black.queen;
    squares[4].textContent = pieces.black.king;
    squares[5].textContent = pieces.black.bishop;
    squares[6].textContent = pieces.black.knight;
    squares[7].textContent = pieces.black.rook;
    for (let i = 8; i < 16; i++) {
      squares[i].textContent = pieces.black.pawn;
    }
  
    for (let i = 48; i < 56; i++) {
      squares[i].textContent = pieces.white.pawn;
    }
    squares[56].textContent = pieces.white.rook;
    squares[57].textContent = pieces.white.knight;
    squares[58].textContent = pieces.white.bishop;
    squares[59].textContent = pieces.white.queen;
    squares[60].textContent = pieces.white.king;
    squares[61].textContent = pieces.white.bishop;
    squares[62].textContent = pieces.white.knight;
    squares[63].textContent = pieces.white.rook;

    view = "white";
  }
  //
  whiteView()

  //set the board with black point of view
  function blackView(){
    squares[0].textContent = pieces.white.rook;
    squares[1].textContent = pieces.white.knight;
    squares[2].textContent = pieces.white.bishop;
    squares[3].textContent = pieces.white.queen;
    squares[4].textContent = pieces.white.king;
    squares[5].textContent = pieces.white.bishop;
    squares[6].textContent = pieces.white.knight;
    squares[7].textContent = pieces.white.rook;
    for (let i = 8; i < 16; i++) {
      squares[i].textContent = pieces.white.pawn;
    }
    
    for (let i = 48; i < 56; i++) {
      squares[i].textContent = pieces.black.pawn;
    }
    squares[56].textContent = pieces.black.rook;
    squares[57].textContent = pieces.black.knight;
    squares[58].textContent = pieces.black.bishop;
    squares[59].textContent = pieces.black.queen;
    squares[60].textContent = pieces.black.king;
    squares[61].textContent = pieces.black.bishop;
    squares[62].textContent = pieces.black.knight;
    squares[63].textContent = pieces.black.rook;

    view = "black";
  }
  //
  //blackView()

  //removes the possible event listener on all squares
  function removerEventListener(p){
    squares.forEach(e => {
      e.removeEventListener('click', p)
    })
  }
  //

  //for all next 12 functions: when a highlighted color piece possible movement is clicked, it makes the move, reset the board and variable and changes the turn
  function whitePawnClick(element){
    element.target.textContent = pieces.white.pawn;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(whiteCheckMovements);
    removerEventListener(whitePawnClick);
    removerEventListener(wM);
    blackMove();
  }

  function blackPawnClick(element){
    element.target.textContent = pieces.black.pawn;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackPawnClick);
    removerEventListener(bM);
    whiteMove();
  }

  function whiteRookClick(element){
    element.target.textContent = pieces.white.rook;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(whiteCheckMovements);
    removerEventListener(whiteRookClick);
    removerEventListener(wM);
    blackMove();
  }

  function blackRookClick(element){
    element.target.textContent = pieces.black.rook;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackRookClick);
    removerEventListener(bM);
    whiteMove();
  }

  function whiteKnightClick(element){
    element.target.textContent = pieces.white.knight;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(whiteCheckMovements);
    removerEventListener(whiteKnightClick);
    removerEventListener(wM);
    blackMove()
  }

  function blackKnightClick(element){
    element.target.textContent = pieces.black.knight;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackKnightClick);
    removerEventListener(bM);
    whiteMove()
  }

  function whiteBishopClick(element){
    element.target.textContent = pieces.white.bishop;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(whiteCheckMovements);
    removerEventListener(whiteBishopClick);
    removerEventListener(wM);
    blackMove()
  }

  function blackBishopClick(element){
    element.target.textContent = pieces.black.bishop;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackBishopClick);
    removerEventListener(bM);
    whiteMove()
  }

  function whiteQueenClick(element){
    element.target.textContent = pieces.white.queen;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(whiteCheckMovements);
    removerEventListener(whiteQueenClick);
    removerEventListener(wM);
    blackMove()
  }

  function blackQueenClick(element){
    element.target.textContent = pieces.black.queen;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackQueenClick);
    removerEventListener(bM);
    whiteMove()
  }

  function whiteKingClick(element){
    element.target.textContent = pieces.white.king;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(whiteCheckMovements);
    removerEventListener(whiteKingClick);
    removerEventListener(wM);
    blackMove()
  }

  function blackKingClick(element){
    element.target.textContent = pieces.black.king;
    lastElement.textContent = "";
    while (onlyPossibleMovements.length) {onlyPossibleMovements.splice(0, 1);}
    resetBoardColor();
    removerEventListener(blackCheckMovements);
    removerEventListener(blackKingClick);
    removerEventListener(bM);
    whiteMove()
  }
  //

  //adds click event listener on all black pieces, only used when not check
  function bM(element){
    reset();
    lastElement = element.target;
    resetBoardColor();
    var n = parseInt(lastElement.classList[5]);
    if (lastElement.textContent === pieces.black.pawn){
      blackPawn(n, false, view);
    }
    if (lastElement.textContent === pieces.black.rook){
      blackRook(n, false);
    }
    if (lastElement.textContent === pieces.black.bishop){
      blackBishop(n, false);
    }
    if (lastElement.textContent === pieces.black.knight){
      blackKnight(n, false);
    }
    if (lastElement.textContent === pieces.black.queen){
      blackQueen(n, false);
    }
    if (lastElement.textContent === pieces.black.king){
      blackKing(n, false);
    }
  }

  //when turn changes, will check if its check
  //if is, click event listeners will be add only to pieces with possible movements, if theres none, checkmate
  //if not, will call function bM()
  function blackMove(){

    let whites = blackKingCheck();
    let firstSquare;

    if (whites.check){
      let blacks = whiteKingCheck();

      for (const element of blacks.moves){
        let aux = element.piece;
        firstSquare = squares[aux];
        let p = firstSquare.textContent;
        for (const e of element.move){

          let possibleSquare = squares[e];
          let possibleSquarePiece = "";
          if (possibleSquare.textContent != ""){
            possibleSquarePiece = possibleSquare.textContent;
          }

          onlyPossibleMovements.push({peça:firstSquare, movimento:possibleSquare})
          possibleSquare.textContent = p;
          firstSquare.textContent = "";
          whites = blackKingCheck();
          if (whites.check){
            onlyPossibleMovements.pop();
          }

          possibleSquare.textContent = possibleSquarePiece;
          firstSquare.textContent = p;
        }
      }

      if (onlyPossibleMovements.length == 0){
        alert("cheque mate");
        return
      }

      for (let i = 0; i < squares.length; i++) {
        if(anyBlackPiece(i)){
          for (let j = 0; j < onlyPossibleMovements.length; j++){
            let possibleMove = onlyPossibleMovements[j].peça
            if (squares[i] === possibleMove){
              squares[i].addEventListener('click', blackCheckMovements);
            }
          }
        }
      }
    } else {

      for (let i = 0; i < squares.length; i++) {
        if(anyBlackPiece(i)){
          squares[i].addEventListener('click', bM, {once : true});
        }
      }
    } 
  }
  //blackMove()

  //when a piece of the only possible movements is clicked during a black in check, this function will be called
  //will only highlight the movement that stops the check
  function blackCheckMovements(element){

    lastElement = element.target;
    let p = "";
    let allowOnlyPossible = [];

    for (let i = 0; i < onlyPossibleMovements.length; i++){
      if (lastElement == onlyPossibleMovements[i].peça){
        let par = onlyPossibleMovements[i];
        let peça = par.peça;
        p = peça.textContent;
        allowOnlyPossible.push(par.movimento);
      }
    }

    if (p == pieces.black.pawn){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackPawnClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.black.rook){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackRookClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.black.knight){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackKnightClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.black.bishop){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackBishopClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.black.queen){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackQueenClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.black.king){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', blackKingClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
  }

  //adds click event listener on all white pieces, only used when not check
  function wM(element){
    reset();
    lastElement = element.target;
    resetBoardColor();
    var n = parseInt(lastElement.classList[5]);
    if (lastElement.textContent === pieces.white.pawn){
      whitePawn(n, false, view);
    }
    if (lastElement.textContent === pieces.white.rook){
      whiteRook(n, false);
    }
    if (lastElement.textContent === pieces.white.bishop){
      whiteBishop(n, false);
    }
    if (lastElement.textContent === pieces.white.knight){
      whiteKnight(n, false);
    }
    if (lastElement.textContent === pieces.white.queen){
      whiteQueen(n, false);
    }
    if (lastElement.textContent === pieces.white.king){
      whiteKing(n, false);
    }
  }
  //

  //when turn changes, will check if its check
  //if is, click event listeners will be add only to pieces with possible movements, if theres none, checkmate
  //if not, will call function wM()
  function whiteMove(){

    let blacks = whiteKingCheck();
    let firstSquare;

    if (blacks.check){
      let whites = blackKingCheck();

      for (const element of whites.moves){
        let aux = element.piece;
        firstSquare = squares[aux];
        let p = firstSquare.textContent;
        for (const e of element.move){

          let possibleSquare = squares[e];
          let possibleSquarePiece = "";
          if (possibleSquare.textContent != ""){
            possibleSquarePiece = possibleSquare.textContent
          }

          onlyPossibleMovements.push({peça:firstSquare, movimento:possibleSquare})
          possibleSquare.textContent = p;
          firstSquare.textContent = "";
          blacks = whiteKingCheck();
          if (blacks.check){
            onlyPossibleMovements.pop();
          }

          possibleSquare.textContent = possibleSquarePiece;
          firstSquare.textContent = p;
        }
      }

      if (onlyPossibleMovements.length == 0){
        alert("cheque mate")
        return
      }

      for (let i = 0; i < squares.length; i++) {
        if(anyWhitePiece(i)){
          for (let j = 0; j < onlyPossibleMovements.length; j++) {
            let possibleMove = onlyPossibleMovements[j].peça
            if (squares[i] === possibleMove){
                squares[i].addEventListener('click', whiteCheckMovements);
            }
          }
        }
      }
    } else {

      for (let i = 0; i < squares.length; i++) {
        if(anyWhitePiece(i)){
          squares[i].addEventListener('click', wM, {once : true});
        }
      }
    }

  }
  //
  whiteMove()

  //when a piece of the only possible movements is clicked during a white in check, this function will be called
  //will only highlight the movement that stops the check
  function whiteCheckMovements(element){

    lastElement = element.target;
    let p = "";
    let allowOnlyPossible = [];

    for (let i = 0; i < onlyPossibleMovements.length; i++) {
      if (lastElement == onlyPossibleMovements[i].peça){
        let par = onlyPossibleMovements[i];
        let peça = par.peça;
        p = peça.textContent;
        allowOnlyPossible.push(par.movimento);
      }
    }

    if (p == pieces.white.pawn){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whitePawnClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.white.rook){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whiteRookClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.white.knight){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whiteKnightClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.white.bishop){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whiteBishopClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.white.queen){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whiteQueenClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    if (p == pieces.white.king){
      reset()
      for (const element of allowOnlyPossible){
        element.addEventListener('click', whiteKingClick, {once : true});
        element.style.backgroundColor = 'yellow';
      }
    }
    while (allowOnlyPossible.length) {
      allowOnlyPossible.splice(0, 1);
    }
    console.log(allowOnlyPossible)
  }
  //

  //reset the color and removes all possible event listeners, used to prevent some bugs on the board
  function reset(){
    resetBoardColor()
    removerEventListener(whitePawnClick)
    removerEventListener(whiteRookClick)
    removerEventListener(whiteKnightClick)
    removerEventListener(whiteBishopClick)
    removerEventListener(whiteQueenClick)
    removerEventListener(whiteKingClick)
    removerEventListener(blackPawnClick)
    removerEventListener(blackRookClick)
    removerEventListener(blackKnightClick)
    removerEventListener(blackBishopClick)
    removerEventListener(blackQueenClick)
    removerEventListener(blackKingClick)
  }

  //return true if on the square checked theres any black piece, parameter move is the number of the square to be checked
  function anyBlackPiece(move){
    var array = []
    allBlackPieces.forEach(element => {
        (array.push(squares[move].textContent.startsWith(element)))
    });
    var includes = array.includes(true);
    return includes;
  }
  //

  //return true if on the square checked theres any white piece, parameter move is the number of the square to be checked
  function anyWhitePiece(move){
    var array = []
    allWhitePieces.forEach(element => {
        (array.push(squares[move].textContent.startsWith(element)))
    });
    var includes = array.includes(true);
    return includes;
  }
  //

  //for all next 8 functions: will return all squares in the specified direction
  function upMoves(i){
    let reverseUp = [];
    let upMoves = [];
    let col = parseInt(squares[i].classList[2].charAt(0));

    for(const square of squares){
      let squareCol = parseInt(square.classList[2].charAt(0));
      if (parseInt(squares[i].classList[5]) > parseInt(square.classList[5])){
        if (squareCol === col) {
          reverseUp.push(square);
        }
      }
    }

    for(let a = reverseUp.length - 1; a >= 0; a--) {
      upMoves.push(reverseUp[a])
    }

    return upMoves;
  }

  function downMoves(i){

    let downMoves = [];
    let col = parseInt(squares[i].classList[2].charAt(0));

    for(const square of squares){
      let squareCol = parseInt(square.classList[2].charAt(0));
      if (parseInt(squares[i].classList[5]) < parseInt(square.classList[5])){
        if (squareCol === col) {
          downMoves.push(square);
        }
      }
    }
    return downMoves;
  }

  function rightMoves(i){

    let rightMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
    
    for(const square of squares){
      let squareRow = parseInt(square.classList[1].charAt(0));
      if (parseInt(squares[i].classList[5]) < parseInt(square.classList[5])){
        if (squareRow === row) {
          rightMoves.push(square);
        }
      }
    }
    return rightMoves;
  }

  function leftMoves(i){

    let reverseLeft = []
    let leftMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
  
    for(const square of squares){
      let squareRow = parseInt(square.classList[1].charAt(0));
      if (parseInt(squares[i].classList[5]) > parseInt(square.classList[5])){
        if (squareRow === row) {
          reverseLeft.push(square);
        }
      }
    }

    for(let a = reverseLeft.length - 1; a >= 0; a--) {
      leftMoves.push(reverseLeft[a])
    }

    return leftMoves;
  }

  function upRightMoves(i){

    let possibleMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
    let col = parseInt(squares[i].classList[2].charAt(0))
    let j = i - 7;

    while (j >= 0 && parseInt(squares[j].classList[1].charAt(0)) + 1 == row && parseInt(squares[j].classList[2].charAt(0)) - 1 == col) {
      possibleMoves.push(squares[j]);
      row--;
      col++;
      j-= 7;
    }

    return possibleMoves;
  }

  function downRightMoves(i){
    let possibleMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
    let col = parseInt(squares[i].classList[2].charAt(0))
    let j = i + 7;
    
    while (j <= 63 && parseInt(squares[j].classList[1].charAt(0)) - 1 == row && parseInt(squares[j].classList[2].charAt(0)) + 1 == col) {
      possibleMoves.push(squares[j]);
      row++;
      col--;
      j += 7;
    }

    return possibleMoves;
  }

  function upLeftMoves(i){

    let possibleMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
    let col = parseInt(squares[i].classList[2].charAt(0))
    let j = i - 9;
    
    while (j >= 0 && parseInt(squares[j].classList[1].charAt(0)) + 1 == row && parseInt(squares[j].classList[2].charAt(0)) + 1 == col) {
      possibleMoves.push(squares[j]);
      row--;
      col--;
      j -= 9;
    }

    return possibleMoves;
  }

  function downLeftMoves(i){
    let possibleMoves = [];
    let row = parseInt(squares[i].classList[1].charAt(0))
    let col = parseInt(squares[i].classList[2].charAt(0))
    let j = i + 9;
    
    while (j <= 63 && parseInt(squares[j].classList[1].charAt(0)) - 1 == row && parseInt(squares[j].classList[2].charAt(0)) - 1 == col) {
      possibleMoves.push(squares[j]);
      row++;
      col++;
      j += 9;
    }

    return possibleMoves;
  }
  //

  //function to avoid repetition on checking if theres possible movements
  function longMoves(array, color, piece){

    let m = []
    let any1;
    let any2;
    let p;

    if(color == "black"){
      any1 = anyBlackPiece; any2 = anyWhitePiece;
      if(piece == "pawn"){p = blackPawnClick}
      if(piece == "rook"){p = blackRookClick}
      if(piece == "knight"){p = blackKnightClick}
      if(piece == "bishop"){p = blackBishopClick}
      if(piece == "queen"){p = blackQueenClick}
      if(piece == "king"){p = blackKingClick}
    }

    if(color == "white"){
      any1 = anyWhitePiece; any2 = anyBlackPiece;
      if(piece == "pawn"){p = whitePawnClick}
      if(piece == "rook"){p = whiteRookClick}
      if(piece == "knight"){p = whiteKnightClick}
      if(piece == "bishop"){p = whiteBishopClick}
      if(piece == "queen"){p = whiteQueenClick}
      if(piece == "king"){p = whiteKingClick}
    }
    

    if(array.length > 0){
      for (const element of array){
        if(any1(element.classList[5])){
          break
        }
        if(any2(element.classList[5])){
          m.push(element.classList[5])
          element.addEventListener('click', p, {once : true});
          element.style.backgroundColor = 'yellow';
          break
        } else {
          m.push(element.classList[5])
          element.addEventListener('click', p, {once : true});
          element.style.backgroundColor = 'yellow';
        };
      }
    }
    return m;
  }
  //

  //calculates knights possible moves
  function knightMoves(move, row, col, possibleMoves) {
    let moveR = parseInt(squares[move].classList[1].charAt(0));
    let moveC = parseInt(squares[move].classList[2].charAt(0));
    if (row - 1 == moveR && col - 2 == moveC){possibleMoves.push(move)};
    if (row - 2 == moveR && col - 1 == moveC){possibleMoves.push(move)};
    if (row - 2 == moveR && col + 1 == moveC){possibleMoves.push(move)};
    if (row - 1 == moveR && col + 2 == moveC){possibleMoves.push(move)};
    if (row + 1 == moveR && col + 2 == moveC){possibleMoves.push(move)};
    if (row + 2 == moveR && col + 1 == moveC){possibleMoves.push(move)};
    if (row + 2 == moveR && col - 1 == moveC){possibleMoves.push(move)};
    if (row + 1 == moveR && col - 2 == moveC){possibleMoves.push(move)};
  }
  //

  //returns all whites possible movements, and if any of this movements is a square with a black king, return check = true
  function blackKingCheck(){

    let whiteMoves = [];

    for(const element of squares){
      let i = element.classList[5];
      if(anyWhitePiece(i)){
        var piece = element.textContent;
        if(piece == pieces.white.pawn){
          let moves = whitePawn(i, true, view);
          whiteMoves.push({move:moves, piece:i});
          removerEventListener(whitePawnClick)
          removerEventListener(wM);
          resetBoardColor();
        }
        if(piece == pieces.white.rook){
            let moves = whiteRook(i, true);
            whiteMoves.push({move:moves, piece:i});
            removerEventListener(whiteRookClick)
            removerEventListener(wM);
            resetBoardColor();
        }
        if(piece == pieces.white.knight){
            let moves = whiteKnight(i, true);
            whiteMoves.push({move:moves, piece:i});
            removerEventListener(whiteKnightClick)
            removerEventListener(wM);
            resetBoardColor();
        }
        if(piece == pieces.white.bishop){
            let moves = whiteBishop(i, true);
            whiteMoves.push({move:moves, piece:i});
            removerEventListener(whiteBishopClick)
            removerEventListener(wM);
            resetBoardColor();
        }
        if(piece == pieces.white.queen){
          let moves = whiteQueen(i, true);
          whiteMoves.push({move:moves, piece:i});
          removerEventListener(whiteQueenClick)
          removerEventListener(wM);
          resetBoardColor();
        }
        if(piece == pieces.white.king){
          let moves = whiteKing(i, true);
          whiteMoves.push({move:moves, piece:i});
          removerEventListener(whiteKingClick)
          removerEventListener(wM);
          resetBoardColor();
        }
      }
    }

    var ret = {check: false, moves: whiteMoves}

    for (const element of whiteMoves){
      if(element.move != undefined){
        for (const e of element.move){
          if(squares[e].textContent == pieces.black.king){
           ret.check = true;
          }
        }
      }
    }

    return ret;
  }
  //
  
  //returns all blacks possible movements, and if any of this movements is a square with a white king, return check = true
  function whiteKingCheck(){
    
    let blackMoves = [];

    for(const element of squares){
      let i = parseInt(element.classList[5]);
      if(anyBlackPiece(i)){
        var piece = element.textContent;
        if(piece == pieces.black.pawn){
          let moves = blackPawn(i, true,view);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackPawnClick)
          removerEventListener(bM);
          resetBoardColor();
        }
        if(piece == pieces.black.rook){
          let moves = blackRook(i, true);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackRookClick)
          removerEventListener(bM);
          resetBoardColor();
        }
        if(piece == pieces.black.knight){
          let moves = blackKnight(i, true);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackKnightClick)
          removerEventListener(bM);
          resetBoardColor();
        }
        if(piece == pieces.black.bishop){
          let moves = blackBishop(i, true);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackBishopClick)
          removerEventListener(bM);
          resetBoardColor();
        }
        if(piece == pieces.black.queen){
          let moves = blackQueen(i, true);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackQueenClick)
          removerEventListener(bM);
          resetBoardColor();
        }
        if(piece == pieces.black.king){
          let moves = blackKing(i, true);
          blackMoves.push({move:moves, piece:i});
          removerEventListener(blackKingClick)
          removerEventListener(bM);
          resetBoardColor();
        }
      }
    }

    var ret = {check: false, moves: blackMoves}

    for (const element of blackMoves){
      if(element.move != undefined){
        for (const e of element.move){
          if(squares[e].textContent == pieces.white.king){
            ret.check = true;
          } 
        }
      }
    }

    return ret;
  }
  //

  //for all next 12 functions: calculates color piece possible moves
  //if not check, this is the function that will highlight the possible movements
  function whitePawn(i, check, view){

    if (check === false){whiteMove()}

    let m = [];
    let move1;
    let move2;
    let move3;
    let move4;
    let move1w;
    let move1b;
    //en passant
    //virar nova peça no fim do tabuleiro
    
    if (view == "white"){
      move1 = i - 8;
      move2 = i - 16;
      move3 = i - 7;
      move4 = i - 9;
    }

    if (view == "black"){
      move1 = i + 8;
      move2 = i + 16;
      move3 = i + 7;
      move4 = i + 9;
    }

    if (move1 >= 0 && move1 < 64){
      move1b = anyBlackPiece(move1);
      move1w = anyWhitePiece(move1);
      if(move1b == false && move1w == false && squares[i].classList[2] == squares[move1].classList[2]){
        m.push(move1);
        squares[move1].style.backgroundColor = 'yellow';
        squares[move1].addEventListener('click', whitePawnClick, {once : true});
      }
    } 
    
    if (move2 >= 0 && move2 < 64){
      let move2b = anyBlackPiece(move2);
      let move2w = anyWhitePiece(move2);
      if (view == "white" && i >= 48){
        if(move2b == false && move2w == false && squares[i].classList[2] == squares[move2].classList[2] && move1w == false && move1b == false){
          m.push(move2);
          squares[move2].style.backgroundColor = 'yellow';
          squares[move2].addEventListener('click', whitePawnClick, {once : true});
        }
      }
      if (view == "black" && i <= 15){
        if(move2b == false && move2w == false && squares[i].classList[2] == squares[move2].classList[2] && move1w == false && move1b == false){
          m.push(move2);
          squares[move2].style.backgroundColor = 'yellow';
          squares[move2].addEventListener('click', whitePawnClick, {once : true});
        }
      }
    }

    if (move3 >= 0 && move3 < 64){
      let move3b = anyBlackPiece(move3);
      if(move3b == true && squares[i].classList[4] == squares[move3].classList[4]){
        m.push(move3);
          squares[move3].style.backgroundColor = 'yellow';
          squares[move3].addEventListener('click', whitePawnClick, {once : true});
      }
    }
      
    if (move4 >= 0 && move4 < 64){
      let move4b = anyBlackPiece(move4);
      if (move4b == true && squares[i].classList[3] == squares[move4].classList[3]){
        m.push(move4);
          squares[move4].style.backgroundColor = 'yellow';
          squares[move4].addEventListener('click', whitePawnClick, {once : true});
      }
    }

    return m;
  }

  function blackPawn(i, check, view){

    if (check === false){
      blackMove()
    }

    let m = [];
    let move1;
    let move2;
    let move3;
    let move4;
    let move1b;
    let move1w;
    //en passant
    //virar nova peça no fim do tabuleiro

    if (view == "white"){
      move1 = i + 8;
      move2 = i + 16;
      move3 = i + 7;
      move4 = i + 9;
    }

    if (view == "black"){
      move1 = i - 8;
      move2 = i - 16;
      move3 = i - 7;
      move4 = i - 9;
    }

    if (move1 >= 0 && move1 < 64){
      move1b = anyBlackPiece(move1);
      move1w = anyWhitePiece(move1);
      if(move1b == false && move1w == false && squares[i].classList[2] == squares[move1].classList[2]){
        m.push(move1);
        squares[move1].style.backgroundColor = 'yellow';
        squares[move1].addEventListener('click', blackPawnClick, {once : true});
      }
    }

    if (move2 >= 0 && move2 < 64){
      let move2b = anyBlackPiece(move2);
      let move2w = anyWhitePiece(move2);
      if (view == "white" && i <= 15){
        if(move2b == false && move2w == false && squares[i].classList[2] == squares[move2].classList[2] && move1w == false && move1b == false){
          m.push(move2);
          squares[move2].style.backgroundColor = 'yellow';
          squares[move2].addEventListener('click', blackPawnClick, {once : true});
        }
      }
      if (view == "black" && i >= 48){
        if(move2b == false && move2w == false && squares[i].classList[2] == squares[move2].classList[2] && move1w == false && move1b == false){
          m.push(move2);
          squares[move2].style.backgroundColor = 'yellow';
          squares[move2].addEventListener('click', blackPawnClick, {once : true});
        }
      }
    }

    if (move3 >= 0 && move3 < 64){
      let move3b = anyWhitePiece(move3);
      if(move3b == true && squares[i].classList[4] == squares[move3].classList[4]){
        m.push(move3);
        squares[move3].style.backgroundColor = 'yellow';
        squares[move3].addEventListener('click', blackPawnClick, {once : true});
      }
    }
      
    if (move4 >= 0 && move4 < 64){
      let move4b = anyWhitePiece(move4);
      if (move4b == true && squares[i].classList[3] == squares[move4].classList[3]){
        m.push(move4);
        squares[move4].style.backgroundColor = 'yellow';
        squares[move4].addEventListener('click', blackPawnClick, {once : true});
      }

      return m;
    }
  }

  function whiteRook(i, check){

    if (check === false){
      whiteMove()
    }

    let m = [];
    let aux = [];
    let up = upMoves(i);
    let right = rightMoves(i);
    let down = downMoves(i);
    let left = leftMoves(i);

    let c = "white"
    let p = "rook"

    let lUp = longMoves(up, c, p);
    let lRight = longMoves(right, c, p);
    let lDown = longMoves(down, c, p);
    let lLeft = longMoves(left, c, p);

    aux.push(lUp, lRight, lDown, lLeft);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }

    return m;
  }

  function blackRook(i, check){

    if (check === false){
      blackMove()
    }

    let m = [];
    let aux = [];
    let up = upMoves(i);
    let right = rightMoves(i);
    let down = downMoves(i);
    let left = leftMoves(i);

    let c = "black"
    let p = "rook"

    let lUp = longMoves(up, c, p);
    let lRight = longMoves(right, c, p);
    let lDown = longMoves(down, c, p);
    let lLeft = longMoves(left, c, p);

    aux.push(lUp, lRight, lDown, lLeft);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }

    return m;
  }

  function whiteKnight(i, check){

    if (check === false){
      whiteMove()
    }
  
    let m = [];
    let possibleMoves = [];
    let moves = []
    let move1 = i - 10;
    let move2 = i - 17;
    let move3 = i - 15;
    let move4 = i - 6;
    let move5 = i + 10;
    let move6 = i + 17;
    let move7 = i + 15;
    let move8 = i + 6;
    moves.push(move1, move2, move3, move4, move5, move6, move7, move8);
    
    for (const move of moves){
      if(move > 0 && move < 64){
        row = parseInt(squares[i].classList[1].charAt(0))
        col = parseInt(squares[i].classList[2].charAt(0))
        knightMoves(move, row, col, possibleMoves);
      }
    }

    for(const j of possibleMoves){
      let square = squares[j];
      if(anyWhitePiece(square.classList[5])){
        null
      } else {
        square.addEventListener('click', whiteKnightClick, {once : true})
        square.style.backgroundColor = 'yellow';
        m.push(j)
      }
    }
    return m;
  }

  function blackKnight(i, check){

    if (check === false){
      blackMove()
    }

    let m = [];
    let possibleMoves = [];
    let moves = []
    let move1 = i - 10;
    let move2 = i - 17;
    let move3 = i - 15;
    let move4 = i - 6;
    let move5 = i + 10;
    let move6 = i + 17;
    let move7 = i + 15;
    let move8 = i + 6;
    moves.push(move1, move2, move3, move4, move5, move6, move7, move8);
    
    for (const move of moves){
      if(move > 0 && move < 64){
        row = parseInt(squares[i].classList[1].charAt(0))
        col = parseInt(squares[i].classList[2].charAt(0))
        knightMoves(move, row, col, possibleMoves);
      }
    }

    for(const j of possibleMoves){
      let square = squares[j];
      if(anyBlackPiece(square.classList[5])){
        null
      } else {
        square.addEventListener('click', blackKnightClick, {once : true})
        square.style.backgroundColor = 'yellow';
        m.push(j)
      }
    }
    return m;
  }

  function whiteBishop(i, check){

    if (check === false){
      whiteMove()
    }

    let m = [];
    let aux = [];
    var upR = upRightMoves(i);
    var downR = downRightMoves(i);
    var upL = upLeftMoves(i);
    var downL = downLeftMoves(i);

    let c = "white"
    let p = "bishop"

    let lUpR = longMoves(upR,     c, p, check);
    let lDownR = longMoves(downR,   c, p, check);
    let lUpL = longMoves(upL,     c, p, check);
    let lDownL = longMoves(downL,   c, p, check);

    aux.push(lUpR, lDownR, lUpL, lDownL);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }

    return m;
  }

  function blackBishop(i, check){

    if (check === false){
      blackMove()
    }

    let m = [];
    let aux = [];
    var upR = upRightMoves(i);
    var downR = downRightMoves(i);
    var upL = upLeftMoves(i);
    var downL = downLeftMoves(i);

    let c = "black"
    let p = "bishop"

    let lUpR = longMoves(upR,     c, p);
    let lDownR = longMoves(downR,   c, p);
    let lUpL = longMoves(upL,     c, p);
    let lDownL = longMoves(downL,   c, p);

    aux.push(lUpR, lDownR, lUpL, lDownL);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }
    return m;
  }

  function whiteQueen(i, check){

    if (check === false){
      whiteMove()
    }

    let m = [];
    let aux = [];
    let up = upMoves(i);
    let right = rightMoves(i);
    let down = downMoves(i);
    let left = leftMoves(i);
    var upR = upRightMoves(i);
    var downR = downRightMoves(i);
    var upL = upLeftMoves(i);
    var downL = downLeftMoves(i);

    let c = "white";
    let p = "queen"

    let lUp = longMoves(up, c, p);
    let lRight = longMoves(right, c, p);
    let lDown = longMoves(down, c, p);
    let lLeft = longMoves(left, c, p);
    let lUpR = longMoves(upR,     c, p);
    let lDownR = longMoves(downR,   c, p);
    let lUpL = longMoves(upL,     c, p);
    let lDownL = longMoves(downL,   c, p);
    
    aux.push(lUp, lRight, lDown, lLeft, lUpR, lDownR, lUpL, lDownL);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }

    return m;
  }

  function blackQueen(i, check){

    if (check === false){
      blackMove()
    }

    let m = [];
    let aux = [];
    let up = upMoves(i);
    let right = rightMoves(i);
    let down = downMoves(i);
    let left = leftMoves(i);
    var upR = upRightMoves(i);
    var downR = downRightMoves(i);
    var upL = upLeftMoves(i);
    var downL = downLeftMoves(i);

    let c = "black";
    let p = "queen"

    let lUp = longMoves(up, c, p);
    let lRight = longMoves(right, c, p);
    let lDown = longMoves(down, c, p);
    let lLeft = longMoves(left, c, p);
    let lUpR = longMoves(upR,     c, p);
    let lDownR = longMoves(downR,   c, p);
    let lUpL = longMoves(upL,     c, p);
    let lDownL = longMoves(downL,   c, p);
    
    aux.push(lUp, lRight, lDown, lLeft, lUpR, lDownR, lUpL, lDownL);
    for (const element of aux){
      for (const e of element){
        m.push(parseInt(e))
      }
    }

    return m;
  }

  function whiteKing(i, check){

    if (check === false){
      whiteMove()
    }

    let m = [];
    let moves = [];
    let move1 = parseInt(i) - 1;
    let move2 = parseInt(i) - 9;
    let move3 = parseInt(i) - 8;
    let move4 = parseInt(i) - 7;
    let move5 = parseInt(i) + 1;
    let move6 = parseInt(i) + 9;
    let move7 = parseInt(i) + 8;
    let move8 = parseInt(i) + 7;
    moves.push(move1, move2, move3, move4, move5, move6, move7, move8)

    let possibleMoves = [];

    for(const element of moves){
      if(element >= 0 && element < 64){
        possibleMoves.push(element)
      }
    }
    
    for(const element of possibleMoves){
      if(anyWhitePiece(element)){
        null
      } else {
        m.push(element);
        squares[element].addEventListener('click', whiteKingClick, {once : true})
        squares[element].style.backgroundColor = 'yellow'
      }
    }
    while (possibleMoves.length) {
      possibleMoves.splice(0, 1);
    }
    return m;
  }

  function blackKing(i, check){

    if (check === false){
      blackMove()
    }

    let m = [];
    let moves = [];
    let move1 = parseInt(i) - 1;
    let move2 = parseInt(i) - 9;
    let move3 = parseInt(i) - 8;
    let move4 = parseInt(i) - 7;
    let move5 = parseInt(i) + 1;
    let move6 = parseInt(i) + 9;
    let move7 = parseInt(i) + 8;
    let move8 = parseInt(i) + 7;
    moves.push(move1, move2, move3, move4, move5, move6, move7, move8)

    let possibleMoves = [];

    for(const element of moves){
      if(element >= 0 && element < 64){
        possibleMoves.push(element)
      }
    }
    
    for(const element of possibleMoves){
      if(anyBlackPiece(element)){
        null
      } else {
        m.push(element)
        squares[element].addEventListener('click', blackKingClick, {once : true})
        squares[element].style.backgroundColor = 'yellow'
      }
    }
    while (possibleMoves.length) {
      possibleMoves.splice(0, 1);
    }
    return m;
  }
  //