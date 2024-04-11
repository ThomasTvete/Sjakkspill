function isKingCheck(kingSquare) {



    // let enemyPieces = whitePlayer === true ? blackPieces : whitePieces;
    const tempMoves = [...possibleMoves];
    const tempPassantSquare = [...enPassantSquare];
    checkEnemyMove = true;
    // possibleMoves.splice(0);
    // console.log(kingSquare);
    // console.log(possibleMoves);
    // console.log(kingSquare.row);
    // console.log(kingSquare.col);
    // console.log(enemyPieces);

    for (let row of rows) {
        for (let col of columns) {
            let piece = checkPiece(row, col);
            // console.log(piece, row, col);
            if (piece.player === enemyPlayer) {
                //sjekk om movesa til en gitt brikke inkluderer ruta kongen er i
                checkMoves(piece, row, col);
                // console.log(enemyMoves);
                if (enemyMoves.includes(`${kingSquare.row} - ${kingSquare.col}`)) {
                    enemyMoves.splice(0);
                    enPassantSquare.splice(0);
                    for (square of tempPassantSquare) enPassantSquare.push(square);
                    console.log('King is checked');
                    // console.log(possibleMoves);
                    checkEnemyMove = false;
                    // defensivePlayer = null;
                    return true;
                }

                //DET ER TO FORSKJELLIGE POSSIBLEMOVES, MOTSPILLERS MOVES BLANDES INN
                //POSSIBLEMOVES INKLUDERER ALLTID EN MOVE SOM SETTER I SJAKK FORDI SPILLERENS MOVES ER MED
                //nvm fikset det



                enemyMoves.splice(0);
                // console.log(possibleMoves);
                enPassantSquare.splice(0);
                for (square of tempPassantSquare) enPassantSquare.push(square);
                // checkEnemyMove = false;
            }
        }
    }
    enemyMoves.splice(0);
    enPassantSquare.splice(0);
    for (square of tempPassantSquare) enPassantSquare.push(square);
    checkEnemyMove = false;
    // defensivePlayer = null;
    return false;
}

function findKing() {
    let king = whitePlayer === true ? whiteKing : blackKing;
    for (let row of rows) {
        for (let col of columns) {
            let checkedSquare = document.getElementById(`${row} - ${col}`);
            if (checkedSquare.innerHTML === king.chessman) {
                return { row, col };
            }
        }
    }
}

function filterMoves() {
    const oldPossibleMoves = [...possibleMoves];

    //sjekk om kongen er i sjakk gitt de forskjellige hypotetiske game states

    for (let move of oldPossibleMoves) {
        let testedSquare = document.getElementById(`${move}`);
        let testedOGhtml = testedSquare.innerHTML;
        defensivePlayer = whitePlayer === true ? 'white' : 'black';
        testedSquare.classList.add(defensivePlayer);

        // console.log('skjera');
        // console.log(testedOGhtml);

        // console.log(move);

        // NB NB NB!!!! 
        // checkMoves i isKingCheck tar IKKE høyde for den hypotetiske game staten når den kalkulerer hvor
        // den angripende brikken flytter seg, så per nå er den eneste måten å få kongen ut av sjakk å
        // slå ut den angripende brikken eller flytte kongen vekk fra den sårbare ruten
        // IDEER: move funksjonene????
        // nvm fikset, var rot med classList

        testedSquare.innerHTML = squareID.innerHTML;
        squareID.innerHTML = '';
        squareID.classList.remove(defensivePlayer);
        // console.log(testedSquare.innerHTML);
        // console.log(squareID.innerHTML);
        let kingSquare = findKing();
        let kingChecked = isKingCheck(kingSquare);

        squareID.innerHTML = testedSquare.innerHTML;
        squareID.classList.add(defensivePlayer);
        testedSquare.innerHTML = testedOGhtml;
        testedSquare.classList.remove(defensivePlayer);
        defensivePlayer = null;

        if (kingChecked) {
            possibleMoves.splice(possibleMoves.indexOf(`${move}`), 1);
        };
        // console.log(possibleMoves);
    }
}

function isCheckmate() {
    // Sjekk om kongen er i sjakk, loop så gjennom hver brikke for å filtrere ut moves som ikke stopper sjakk
    // om ingen slike moves eksisterer === sjakkmatt??
    const oldEnPassant = [...enPassantSquare]; //dette løser en del en passant bugs
    for (let row of rows) {
        for (let col of columns) {
            let piece = checkPiece(row, col);
            if (piece.player !== enemyPlayer) {
                squareID = document.getElementById(`${row} - ${col}`);
                checkMoves(piece, row, col);
                filterMoves();
                kingSavingMoves.push(...possibleMoves);
                possibleMoves.splice(0);
                squareID = null;

            }
        }
    }
    if (kingSavingMoves.length === 0) {
        alert('Sjakkmatt!');
        console.log('Sjakkmatt!');
    }
    else kingSavingMoves.splice(0);
    enPassantSquare.splice(0);
    for (let passant of oldEnPassant) enPassantSquare.push(passant);
    //FUNKER IKKE: squareID problemer???
    //fikset, squareID var en ting, måtte selvsagt også tømme kingSavingMoves hver gang
}
