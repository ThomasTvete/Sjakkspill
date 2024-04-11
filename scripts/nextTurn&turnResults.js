function captureEnemy() {
    // console.log(squareID.innerHTML);
    if (whitePlayer) capturedBlack.push(squareID.innerHTML);
    else capturedWhite.push(squareID.innerHTML);
    squareID.classList.remove(enemyPlayer);
    changeSquareContent();
}

function changeSquareContent() {
    squareID.innerHTML = playerSelect.innerHTML;
    resetPassant();
    nextTurn();
}

function nextTurn() {
    playerSelect.innerHTML = null;
    whitePlayer = !whitePlayer;
    resetVar();
    enemyPlayer = whitePlayer === true ? 'black' : 'white';
    let kingSquare = findKing();
    if (isKingCheck(kingSquare)) isCheckmate();
    updateView();
    if (playerVsAI && !whitePlayer) setTimeout(aiSearchSquare, 1500);
}


function checkPromotion(row) {
    console.log('promotion time');
    if (playerSelect.innerHTML === '♙' && row === 0) return true;
    else if (playerSelect.innerHTML === '♟' && row === 7) return true;
    else return false;

}

function promotePawn(piece) {
    squareID.innerHTML = piece.innerHTML;
    resetPassant();
    nextTurn();
}

function resetVar() {
    for (let move of possibleMoves) {
        document.getElementById(`${move}`).style.backgroundColor = ''
    }
    squareID.classList.add(squareOwner);
    playerSelect.style.backgroundColor = null;
    playerSelect = null;
    squareOwner = null;
    squareID = null;
    possibleMoves.splice(0);
    castlingMoves.splice(0);
}

// sjekk om en rute er i faresonen fra noen andre ruter og/eller brikker;
// for å se etter sjakk/sjakkmatt??

