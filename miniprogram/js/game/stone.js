const STONE_IMG_SRC = 'images/stone.png'
const STONE_WIDTH   = 30
const STONE_HEIGHT  = 30
const STONE_WIDTH_BIG   = 50
const STONE_HEIGHT_BIG  = 50

var StoneType = {
    NONE: 0,
    BLACK: 1,
    WHITE: 2,
    BAN : 3,
  };

/** 棋子的类型 */
export default class Stone {
    constructor(stoneType = StoneType.BAN) {
        this.img = new Image()
        this.img.src = STONE_IMG_SRC

        this.type = StoneType.NONE;
        this.sx = 0;
        this.sy = 0;
        this.sWidth = STONE_WIDTH;
        this.sHeight = STONE_HEIGHT;
        if (stoneType == StoneType.BLACK) {
            this.sy = 160;
            this.sWidth = 190;
            this.sHeight = 190;
        }
    }

    toString(i) {
        switch (i) {
            default:
                return 'none';
            case StoneType.BLACK:
                return 'black';
            case StoneType.WHITE:
                return 'white';
        }
    }

    draw(ctx, x, y, width = STONE_WIDTH, height = STONE_HEIGHT) {
        console.log("sx=", this.sx, " sy=", this.sy, " x=", x);
        // ctx.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, x, y, width, height);
        ctx.drawImage(this.img, x, y, width, height);

    }
};