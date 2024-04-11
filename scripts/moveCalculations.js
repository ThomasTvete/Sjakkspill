function checkPiece(row, col) {
    const allPieces = [blackPawn, blackQueensRook, blackKingsRook, blackKnight, blackBishop, blackQueen, blackKing,
        whitePawn, whiteQueensRook, whiteKingsRook, whiteKnight, whiteBishop, whiteQueen, whiteKing];
    for (let piece of allPieces) {
        if (piece.chessman === document.getElementById(`${row} - ${col}`).innerHTML) return piece;
    }
    return false;
}

function checkMoves(piece, row, col) {

    switch (piece) {
        case blackPawn:
        case whitePawn:
            movePawn(piece, row, col);
            break;

        case blackQueensRook:
        case blackKingsRook:
        case whiteQueensRook:
        case whiteKingsRook:
            moveRook(piece, row, col);
            break;

        case blackKnight:
        case whiteKnight:
            moveKnight(piece, row, col);
            break;

        case blackBishop:
        case whiteBishop:
            moveBishop(piece, row, col);
            break;

        case blackQueen:
        case whiteQueen:
            moveQueen(piece, row, col);
            break;

        case blackKing:
        case whiteKing:
            moveKing(piece, row, col);
            break;

        default:
            break;
    }
    // if (piece === blackPawn || piece === whitePawn) movePawn(piece, row, col);
    // else if (piece === blackRook || piece === whiteRook) moveRook(row, col);
    // else if (piece === blackKnight || piece === whiteKnight) moveKnight(row, col);
    // else if (piece === blackBishop || piece === whiteBishop) moveBishop(row, col);
    // else if (piece === blackQueen || piece === whiteQueen) moveQueen(row, col);
    // else if (piece === blackKing || piece === whiteKing) moveKing(row, col);
}

function showMoves() {
    for (let move of possibleMoves) {
        document.getElementById(`${move}`).style.backgroundColor = 'green'
    }
}

function movePawn(piece, row, col) {
    const pawnMoves = [];
    let direction = piece.player === 'white' ? -1 : 1;
    let startRow = piece.player === 'white' ? 6 : 1
    const paths = {
        path: { pRow: direction, pCol: 0 },
        pathStart: { pRow: direction * 2, pCol: 0 },
        pathCaptureLeft: { pRow: direction, pCol: -1 },
        pathCaptureRight: { pRow: direction, pCol: 1 },
    };

    for (let pathName in paths) {
        let path = paths[pathName];
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        let firstMove = true;
        let firstRow = row + direction;

        if (withinBoard(newRow, newCol)) {
            if (pathName === 'pathStart'
                && row === startRow
                && !friendlySquare(newRow, newCol)
                && !enemySquare(newRow, newCol)
                && !friendlySquare(firstRow, newCol)
                && !enemySquare(firstRow, newCol)) {
                pawnMoves.push({ newRow, newCol });

            }
            else if (pathName === 'pathCaptureLeft' || pathName === 'pathCaptureRight') {
                if (enemySquare(newRow, newCol)) pawnMoves.push({ newRow, newCol });
                if (enPassant && enPassantMove.includes(`${newRow} - ${newCol}`)) {
                    pawnMoves.push({ newRow, newCol });
                }

            }
            else if (pathName === 'path'
                && !friendlySquare(newRow, newCol)
                && !enemySquare(newRow, newCol)) {
                pawnMoves.push({ newRow, newCol });
                if (firstMove && row === startRow) {
                    enPassantSquare.push(`${newRow} - ${newCol}`);
                    firstMove = false;
                    // pusher ID til ruten rett over startposisjon til bonden
                }
            };
        };
    };

    for (let move of pawnMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
}

function moveRook(piece, row, col) {
    const rookMoves = [];
    const paths = [
        { pRow: 1, pCol: 0 },
        { pRow: -1, pCol: 0 },
        { pRow: 0, pCol: 1 },
        { pRow: 0, pCol: -1 },
    ];

    for (let path of paths) {
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        while (withinBoard(newRow, newCol)) {
            if (friendlySquare(newRow, newCol)) break;
            rookMoves.push({ newRow, newCol })
            if (enemySquare(newRow, newCol)) break;
            newRow += path.pRow;
            newCol += path.pCol;
        };
    };

    for (let move of rookMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
}

function moveKnight(piece, row, col) {
    const knightMoves = [];
    const paths = [
        { pRow: 2, pCol: 1 },
        { pRow: 2, pCol: -1 },
        { pRow: -2, pCol: 1 },
        { pRow: -2, pCol: -1 },
        { pRow: 1, pCol: 2 },
        { pRow: 1, pCol: -2 },
        { pRow: -1, pCol: 2 },
        { pRow: -1, pCol: -2 },
    ];

    for (let path of paths) {
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        if (withinBoard(newRow, newCol)) {
            if (!friendlySquare(newRow, newCol)) {
                knightMoves.push({ newRow, newCol })
            }
        };
    };

    for (let move of knightMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
}

function moveBishop(piece, row, col) {
    const bishopMoves = [];
    const paths = [
        { pRow: 1, pCol: 1 },
        { pRow: -1, pCol: -1 },
        { pRow: -1, pCol: 1 },
        { pRow: 1, pCol: -1 },
    ];

    for (let path of paths) {
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        while (withinBoard(newRow, newCol)) {
            if (friendlySquare(newRow, newCol)) break;
            bishopMoves.push({ newRow, newCol })
            if (enemySquare(newRow, newCol)) break;
            newRow += path.pRow;
            newCol += path.pCol;
        };
    };
    for (let move of bishopMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
}

function moveQueen(piece, row, col) {
    const queenMoves = [];
    const paths = [
        { pRow: 1, pCol: 1 },
        { pRow: -1, pCol: -1 },
        { pRow: -1, pCol: 1 },
        { pRow: 1, pCol: -1 },
        { pRow: 1, pCol: 0 },
        { pRow: -1, pCol: 0 },
        { pRow: 0, pCol: 1 },
        { pRow: 0, pCol: -1 },
    ];

    for (let path of paths) {
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        while (withinBoard(newRow, newCol)) {
            if (friendlySquare(newRow, newCol)) break;
            queenMoves.push({ newRow, newCol })
            if (enemySquare(newRow, newCol)) break;
            newRow += path.pRow;
            newCol += path.pCol;
        };
    };

    for (let move of queenMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
}




function moveKing(piece, row, col) {
    const kingMoves = [];
    const paths = [
        { pRow: 1, pCol: 1 },
        { pRow: -1, pCol: -1 },
        { pRow: -1, pCol: 1 },
        { pRow: 1, pCol: -1 },
        { pRow: 1, pCol: 0 },
        { pRow: -1, pCol: 0 },
        { pRow: 0, pCol: 1 },
        { pRow: 0, pCol: -1 },
        // {pRow: 0, pCol: 2},
        // {pRow: 0, pCol: -2},
    ];
    let kingsRook = whitePlayer === true ? whiteKingsRook : blackKingsRook;
    let queensRook = whitePlayer === true ? whiteQueensRook : blackQueensRook;
    
    
    if (!piece.hasMoved && !checkEnemyMove) {
        if (!kingsRook.hasMoved) {
            let canCastle = castlingLegal(kingsRook);
            if (canCastle && !isKingCheck({ row, col })) {
                kingMoves.push({ newRow: row, newCol: 6 });
                castlingMoves.push(`${row} - 6`);
            }
        }
        if (!queensRook.hasMoved && !checkEnemyMove) {
            let canCastle = castlingLegal(queensRook);
            if (canCastle && !isKingCheck({ row, col })) {
                kingMoves.push({ newRow: row, newCol: 2 });
                castlingMoves.push(`${row} - 2`);
            }
        }
    }
    
    for (let path of paths) {
        let newRow = row + path.pRow;
        let newCol = col + path.pCol;
        if (withinBoard(newRow, newCol)) {
            if (!friendlySquare(newRow, newCol)) {
                kingMoves.push({ newRow, newCol })
            };
        };
    };
    
    for (let move of kingMoves) {
        if (checkEnemyMove) enemyMoves.push(`${move.newRow} - ${move.newCol}`);
        else possibleMoves.push(`${move.newRow} - ${move.newCol}`);
    };
    
}

function withinBoard(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;

}