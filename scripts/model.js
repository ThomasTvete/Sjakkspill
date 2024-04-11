

const blackPawn = {
    chessman: '♟',
    player: 'black',


}

const blackQueensRook = {
    chessman: ' ♜', //janky måte å differensiere de to tårnene
    player: 'black',
    hasMoved: false,
    side: 'Queen',
}

const blackKingsRook = {
    chessman: '♜ ',
    player: 'black',
    hasMoved: false,
    side: 'King',
}

const blackKnight = {
    chessman: '♞',
    player: 'black',
}

const blackBishop = {
    chessman: '♝',
    player: 'black',
}

const blackQueen = {
    chessman: '♛',
    player: 'black',
}

const blackKing = {
    chessman: '♚',
    player: 'black',
    hasMoved: false,
}

const whitePawn = {
    chessman: '♙',
    player: 'white',
}

const whiteQueensRook = {
    chessman: ' ♖',
    player: 'white',
    hasMoved: false,
    side: 'Queen',
}
const whiteKingsRook = {
    chessman: '♖ ',
    player: 'white',
    hasMoved: false,
    side: 'King',
}

const whiteKnight = {
    chessman: '♘',
    player: 'white',
}

const whiteBishop = {
    chessman: '♗',
    player: 'white',
}

const whiteQueen = {
    chessman: '♕',
    player: 'white',
}

const whiteKing = {
    chessman: '♔',
    player: 'white',
    hasMoved: false,
}

// const blackPawn = '&#9823;'

// const whitePawn = '&#9817;'

const blackPieces = [blackQueensRook, blackKnight, blackBishop, blackQueen,
    blackKing, blackBishop, blackKnight, blackKingsRook]

const whitePieces = [whiteQueensRook, whiteKnight, whiteBishop, whiteQueen,
    whiteKing, whiteBishop, whiteKnight, whiteKingsRook]


let whitePlayer = true;

let defensivePlayer = null;

let enemyPlayer = 'black';

const whiteChessman = [whitePawn.chessman, whiteQueensRook.chessman, whiteKingsRook.chessman,
whiteKnight.chessman, whiteBishop.chessman, whiteQueen.chessman, whiteKing.chessman]

let squareID = null;

let playerSelect = null;

let squareOwner = null;

let promotion = null;

const possibleMoves = [];

const rows = [0, 1, 2, 3, 4, 5, 6, 7];
const columns = [0, 1, 2, 3, 4, 5, 6, 7];

const capturedWhite = [];
const capturedBlack = [];

const enPassantMove = [];
const enPassantSquare = [];
const enPassantCaptive = [];
let enPassant = false;

const enemyMoves = [];
let checkEnemyMove = false;

const kingSavingMoves = [];

const castlingMoves = [];

let playerVsAI = false;

const aiSquareChoices = [];
const aiMoveChoices = [];
const aiPrioritySquare = [];
const aiPriorityMove = [];

