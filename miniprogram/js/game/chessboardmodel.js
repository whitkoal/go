import Stone from './stone';
import StoneType from './stone';

const ROW_COUNT = 4;
const COL_COUNT = 4;

export default class ChessboardModel {
    constructor() {
        const chessBoard = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            var row = [];
            for (let j = 0; j < COL_COUNT; j++) {
                row.push({
                    x : 0,
                    y : 0,
                    enable : true,
                    stone : null,
                });
            }
            chessBoard.push(row);
        }
        chessBoard[0][0].enable = false;
        chessBoard[0][3].enable = false;
        chessBoard[3][0].enable = false;
        chessBoard[3][3].enable = false;
        this.chessBoard = chessBoard;
        this.addStone(1, 0, StoneType.BLACK);
    }

    addStone(i, j, stoneType) {
        if (this.chessBoard[i][j].enable) {
            this.chessBoard[i][j].stone = new Stone(stoneType);
        }
    }

    draw(ctx) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.chessBoard[i][j].stone != null) {
                    this.chessBoard[i][j].stone.draw(ctx, this.chessBoard[i][j].x, this.chessBoard[i][j].y, 30, 30);
                }
            }
        }
    }

    getChessBoard() {
        return this.chessBoard;
    }

    bindPos(firstPosX, firstPosY, space) {
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COL_COUNT; j++) {
                this.chessBoard[i][j].x = firstPosX + space * i;
                this.chessBoard[i][j].y = firstPosY + space * j;
                console.log("this.chessBoard[i][j].x=", this.chessBoard[i][j].x, "  this.chessBoard[i][j].y=", this.chessBoard[i][j].y);
            }
        }
    }





}
