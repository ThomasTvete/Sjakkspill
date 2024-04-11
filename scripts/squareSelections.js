function selectSquare(row, col) {
    squareID = document.getElementById(`${row} - ${col}`);
    if (playerSelect === null && checkPlayer()) selectPiece(row, col);
    else if (squareID === playerSelect) resetVar();
    else if (checkLegal(row, col) && castlingMoves.includes(`${row} - ${col}`)) setCastling(row, col);
    else if (checkPassant(row, col) && checkLegal(row, col)) setPassant(row, col);
    else if (checkLegal(row, col) && enPassantMove.includes(`${row} - ${col}`)) capturePassant(row, col);
    else if (checkLegal(row, col)) {
        // console.log('yo,');
        setPiece(row, col);
    }

}

function checkPlayer() {
    if (whitePlayer) return whiteChessman.includes(`${squareID.innerHTML}`);
    else if (!whitePlayer) return !whiteChessman.includes(`${squareID.innerHTML}`);
}

function checkLegal(row, col) {
    return possibleMoves.includes(`${row} - ${col}`);

}

function selectPiece(row, col) {
    if (squareID.innerHTML === '') return;
    // let kingInDanger = isKingCheck();
    let piece = checkPiece(row, col);
    checkMoves(piece, row, col);
    // if (kingInDanger) {
    //     console.log('hello');
    //     console.log(possibleMoves);
    //     filterMoves();
    // }
    filterMoves();
    showMoves();
    playerSelect = squareID;
    playerSelect.style.backgroundColor = 'red';
    squareOwner = piece.player;
    squareID.classList.remove(`${squareOwner}`);
    squareID = null;

}

function setPiece(row, col) {
    // console.log('dette');
    castlingStatUpdate();
    if (enemySquare(row, col)) {
        // console.log('brikken');
        captureEnemy();
        if (checkPromotion(row)) promotionView();
        else changeSquareContent();
    }
    else if (checkPromotion(row)) promotionView();
    else changeSquareContent();
}



