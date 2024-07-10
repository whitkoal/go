import ChessboardModel   from './chessboardmodel'
import Stone from './stone';
import StoneType from './stone';


const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

export default class Chessboard {
    constructor(ctx) {
        let chessboardMargin = 15;
        let rate = 0.9

        this.chessboardSizePX = screenWidth * rate;
        this.cellSizePX = this.chessboardSizePX / 3.0;
        this.chessboardLineSize = this.chessboardSizePX - chessboardMargin * 2;
        this.chessboardX = screenWidth * (1 - rate) / 2.0;
        this.chessboardY = (screenHeight - this.chessboardSizePX) / 2;
        this.node01X = this.chessboardX + this.cellSizePX;
        this.node01Y = this.chessboardY + chessboardMargin;
        this.node02X = this.chessboardX + this.cellSizePX * 2;
        this.node32X = this.node02X;

        this.node10X = this.chessboardX + chessboardMargin;
        this.node10Y = this.chessboardY + this.cellSizePX;
        this.node22X = this.chessboardX + this.cellSizePX * 2;

        this.model = new ChessboardModel();
        this.model.bindPos(this.chessboardX, this.chessboardY, this.cellSizePX);
        this.initStone(this.model);
    }

    update(ctx) {
        
    }

    render(ctx) { 
        this.updateBackground(ctx);
        this.initChessboard(ctx);
        this.initStone(ctx);
    }

    initChessboard(ctx) {
        ctx.save();
        ctx.fillStyle = '#FFCA28';
        ctx.fillRect(this.chessboardX, this.chessboardY, this.chessboardSizePX, this.chessboardSizePX);

        ctx.fillStyle = 'blud';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.node01X, this.node01Y, this.cellSizePX, this.chessboardLineSize);
        ctx.strokeRect(this.node10X, this.node10Y, this.chessboardLineSize, this.cellSizePX);
        ctx.restore();
        // this.model = new ChessboardModel();
        this.model.draw(ctx);
    }

    initStone(chessboard) {
        // this.model.addStone(0, 1, StoneType.BLACK);
        // this.model.addStone(0, 2, StoneType.BLACK);
        // this.model.addStone(1, 1, StoneType.BLACK);
        // this.model.addStone(1, 2, StoneType.BLACK);
        // this.model.addStone(2, 1, StoneType.WHITE);
        // this.model.addStone(2, 2, StoneType.WHITE);
        // this.model.addStone(3, 1, StoneType.WHITE);
        // this.model.addStone(3, 2, StoneType.WHITE);
    }

    updateBackground(ctx)
    {
        ctx.save();
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        ctx.fillStyle = 'white';
        ctx.font = "20px";
        ctx.fillText("四子棋", 20, 80);

        ctx.restore();
    }
}