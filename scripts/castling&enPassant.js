function setPassant(row, col) {
    //lagre hvilken rute som kan flyttes til for å fange bonden som gjorde to hopp
    // + lagre rute ID til bonden som fanges ved å flytte til en passant ruten
    enPassant = true;
    enPassantMove.splice(0);
    enPassantCaptive.splice(0);
    enPassantMove.push(enPassantSquare[0]);
    enPassantSquare.splice(0);
    enPassantCaptive.push(`${row} - ${col}`);
    squareID.innerHTML = playerSelect.innerHTML;
    // console.log('???');
    nextTurn();
}

function capturePassant(row, col) {
    let captiveID = document.getElementById(`${enPassantCaptive}`);

    resetPassant();
    if (whitePlayer) capturedBlack.push(captiveID.innerHTML);
    else capturedWhite.push(captiveID.innerHTML);
    captiveID.innerHTML = '';
    captiveID.classList.remove(enemyPlayer);
    squareID.innerHTML = playerSelect.innerHTML;
    nextTurn();



}

function resetPassant() {
    enPassant = false;
    enPassantMove.splice(0);
    enPassantCaptive.splice(0);
    enPassantSquare.splice(0);

}

function checkPassant(row, col) {
    return enPassantSquare.length > 0 && !enPassantSquare.includes(`${row} - ${col}`);

}

function castlingStatUpdate() {
    let pieceRow = playerSelect.id[0];
    let pieceCol = playerSelect.id[playerSelect.id.length - 1];
    let piece = checkPiece(pieceRow, pieceCol);
    if (!piece.hasMoved) piece.hasMoved = true;
    else return;
}


function castlingLegal(rook) {
    //sjekk om kongen eller det relevante tårnet har vært flyttet på
    //sjekk om det er noe i mellom kongen og tårnet
    //sjekk om kongen for øyeblikket er i sjakk
    //sjekk om kongen flytter seg igjennom eller lander på en rute som er sårbar
    //(flytt kongen midlertidig til hver rute og kjør isKingCheck? trekke findKing ut av isKingCheck?)
    //hardkode hele skiten???

    let playerRow = whitePlayer === true ? '7' : '0';

    const kingTravelSquares = rook.side === 'Queen' ? [{ row: playerRow, col: 2 }, { row: playerRow, col: 3 }] : [{ row: playerRow, col: 5 }, { row: playerRow, col: 6 }];
    const rookTravelSquare = rook.side === 'Queen' ? [{ row: playerRow, col: 1 }] : [];

    let clearTravel = isRowEmpty(kingTravelSquares, rookTravelSquare);
    let safeTravel = isRowAttacked(kingTravelSquares);

    if (clearTravel && safeTravel) return true;
    else return false;


}

function isRowEmpty(kingSquares, rookSquare) {
    let squaresToCheck = [...kingSquares, ...rookSquare];
    for (let square of squaresToCheck) {
        if (document.getElementById(`${square.row} - ${square.col}`).innerHTML !== '') return false;
    }
    return true;

}

function isRowAttacked(kingSquares) {
    for (let square of kingSquares) {
        if (isKingCheck(square)) return false;
    }
    return true;
}

function setCastling(row, col) {
    let king = whitePlayer === true ? whiteKing : blackKing;
    let rookCol = col === 2 ? 0 : 7;
    let rook = checkPiece(row, rookCol);
    let rookLocation = document.getElementById(`${row} - ${rookCol}`);
    let rookDestCol = rook.side === 'Queen' ? col + 1 : col - 1;
    let rookDestination = document.getElementById(`${row} - ${rookDestCol}`);

    squareID.innerHTML = playerSelect.innerHTML;
    rookDestination.innerHTML = rookLocation.innerHTML;
    rookDestination.classList.add(squareOwner);
    rookLocation.innerHTML = '';
    rookLocation.classList.remove(squareOwner);
    king.hasMoved = true;
    rook.hasMoved = true;

    resetPassant();
    nextTurn();



}

