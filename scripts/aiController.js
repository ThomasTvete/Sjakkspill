function singlePlayer() {
    playerVsAI = true;
    drawBoard();
}

function aiSearchSquare() {
    const oldEnPassant = [...enPassantSquare];

    for (let row of rows) {
        for (let col of columns) {
            squareID = document.getElementById(`${row} - ${col}`);
            if (checkPlayer()) {
                let piece = checkPiece(row, col);
                checkMoves(piece, row, col);
                filterMoves(); //tror det er massive bugs i denne, noe med classList som addes overalt
                //nvm, ble lei av classlist bugs, bruker heller en variant av checkPiece for å sjekke friendly/enemySquare
                //så class-basert tilhørighet av ruter er gammelt nytt
                if (piece.player === 'black' && possibleMoves.length > 0) {
                    checkCaptureMoves(row, col);
                    aiSquareChoices.push({ row, col });
                }
            }
            squareID = null;
            possibleMoves.splice(0);
            castlingMoves.splice(0);


        }
    }
    enPassantSquare.splice(0);
    for (let passant of oldEnPassant) enPassantSquare.push(passant);
    aiSelectSquare();
}

function checkCaptureMoves(row, col) {
    for (let move of possibleMoves) {
        if (enemySquare(move[0], move[move.length - 1])) aiPrioritySquare.push({ row, col })
    }
}

function aiSelectSquare() {
    let randomCapture = Math.floor(Math.random() * 10)
    let randomIndex = null;
    let randomSquare = null;
    if (aiPrioritySquare.length > 0 && randomCapture > 2) {
        randomIndex = Math.floor(Math.random() * aiPrioritySquare.length);
        randomSquare = aiPrioritySquare[randomIndex];
        squareID = document.getElementById(`${randomSquare.row} - ${randomSquare.col}`);
    }
    else {
        randomIndex = Math.floor(Math.random() * aiSquareChoices.length);
        randomSquare = aiSquareChoices[randomIndex];
        squareID = document.getElementById(`${randomSquare.row} - ${randomSquare.col}`);
    }
    aiSquareChoices.splice(0);
    aiPrioritySquare.splice(0);
    selectPiece(randomSquare.row, randomSquare.col);
    setTimeout(aiSelectMove, 2000);
}

function aiSelectMove() {
    aiMoveChoices.splice(0);
    aiPriorityMove.splice(0);
    let randomIndex = null;
    let randomMove = null;
    const oldEnPassant = [...enPassantSquare];

    for (let move of possibleMoves) {
        aiMoveChoices.push({ row: move[0], col: move[move.length - 1] })
        if (enemySquare(move[0], move[move.length - 1])) aiPriorityMove.push({ row: move[0], col: move[move.length - 1] });
    }
    if (aiPriorityMove.length > 0) {
        randomIndex = Math.floor(Math.random() * aiPriorityMove.length);
        randomMove = aiPriorityMove[randomIndex];
    }
    else {
        randomIndex = Math.floor(Math.random() * aiMoveChoices.length);
        randomMove = aiMoveChoices[randomIndex];
    }
    enPassantSquare.splice(0);
    for (let passant of oldEnPassant) enPassantSquare.push(passant);
    // console.log(randomMove);
    selectSquare(randomMove.row, randomMove.col);

}