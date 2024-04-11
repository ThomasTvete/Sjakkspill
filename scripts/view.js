function chooseGame() {
    document.getElementById('app').innerHTML = /*HTML*/ `
    <div class="beginGameView">
        <h1>Velg antall spillere</h1>
        <div class="gameStartButtons">
            <div>
                <button class="startButton" onclick="singlePlayer()">1 spiller</button>
            </div>
            <div>
            <button class="startButton" onclick="drawBoard()">2 spillere</button>
            </div>
        </div>
    </div>
    `;

}

function drawBoard() {
    let html = ''

    for (let row of rows) {
        for (let col of columns) {
            let chessPiece = ''
            if (row === 0) chessPiece = blackPieces[col];
            else if (row === 1) chessPiece = blackPawn;
            else if (row === 6) chessPiece = whitePawn;
            else if (row === 7) chessPiece = whitePieces[col];

            let squareColor = ((row + col) % 2) === 0 ? 'light' : 'dark';

            html += /*HTML*/ `
            <div id="${row} - ${col}" class="${squareColor} square ${chessPiece.player ?? ''}" onclick="selectSquare(${row}, ${col})">${chessPiece.chessman ?? ''}</div> 
            `;
        }

    }
    document.getElementById('app').innerHTML = /*HTML*/ `
    <h1 id="playerTurn">Det er ${whitePlayer === true ? 'hvit' : 'sort'} spillers tur</h1>
    <div class="table">
        <div id="promotions"></div>
        <div class="chessFrame">${html}</div>
        <div class="capturedPieces">
            <div class="blackSideOfBoard">
                <h5>Utslåtte hvite brikker</h5>
                <div id="capturedWhite"></div>
            </div>
            <div class="whiteSideOfBoard">
                <h5>Utslåtte sorte brikker</h5>
                <div id="capturedBlack"></div>
            </div>
        </div>
    </div>

    `;
}

function updateView() {
    document.getElementById('playerTurn').innerHTML = `Det er ${whitePlayer === true ? 'hvit' : 'sort'} spillers tur`
    document.getElementById('capturedWhite').innerHTML = capturedWhite.join(' ');
    document.getElementById('capturedBlack').innerHTML = capturedBlack.join(' ');
    document.getElementById('promotions').innerHTML = '';

}

function promotionView() {
    let html = ''
    const promotionPieces = whitePlayer === true ? ['♕', '♖', '♘', '♗'] : ['♛', '♜', '♞', '♝'];

    html = /*HTML*/ `
    <h1>Velg bondeforvandling</h1>
    <h2 class="promotionChoice" onclick="promotePawn(this)">${promotionPieces[0]}</h2>
    <h3>
        <span class="promotionChoice" onclick="promotePawn(this)">${promotionPieces[1]}</span>
        <span class="promotionChoice" onclick="promotePawn(this)">${promotionPieces[2]}</span>
        <span class="promotionChoice" onclick="promotePawn(this)">${promotionPieces[3]}</span>
    </h3>
    `;
    document.getElementById('promotions').innerHTML = html;
}



