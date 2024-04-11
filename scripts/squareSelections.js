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
    }
    else if (checkPromotion(row)) promotionView();
    else changeSquareContent();
}


function friendlySquare(row, col) {
    let piece = checkPiece(row, col);
    let currentPlayer = whitePlayer === true ? 'white' : 'black';
    if (checkEnemyMove) {
        if (piece.player === enemyPlayer) return true;
        else return false;
    }
    else {
        if (piece.player === currentPlayer) return true;
        else return false;
    }
    // return document.getElementById(`${row} - ${col}`).classList.contains(piece.player);

}

function enemySquare(row, col) {
    // console.log(checkEnemyMove);
    // console.log(defensivePlayer);
    // console.log(enemyPlayer);
    // console.log('er')
    let piece = checkPiece(row, col);
    if (checkEnemyMove) {
        if (piece.player === defensivePlayer) return true;
        else return false;
        // console.log('fiende sjekkes');
        // return document.getElementById(`${row} - ${col}`).classList.contains(defensivePlayer);
    }
    else {
        if (piece.player === enemyPlayer) return true;
        else return false;
        // console.log('fiende sjekkes ikke');
        // return document.getElementById(`${row} - ${col}`).classList.contains(enemyPlayer);
    }

}
