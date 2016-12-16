export enum sqStates {
	None,
	Start,
	End, 
	Path, 
	Selected
}
export enum sqColor { white, black  }

export class Coord {	
	protected _algebraic_letter: string;
   	protected _algebraic_num: number;	
    constructor(public x: number,public y: number) {  
		if (x>=0 && x < 26)
			this._algebraic_letter=String.fromCharCode(97 + x);
		else 
			this._algebraic_letter="";
		this._algebraic_num=y+1;		
	}
	get alg_not() {
		return this._algebraic_letter + this._algebraic_num.toString();
	}	
}

export class Square extends Coord {
	
	protected _currState: number;
	colors: Array<string>;
	constructor(public x: number,public y: number, public sqcolor: number) {
		super(x,y);		
		
		this.colors=['whiteorblack','green','blue','grey','orange'];				
		this._currState=sqStates.None;
	}	
	getColor(): string{
		let color: string="";
		if (this._currState ==sqStates.None) 
			color=sqColor[this.sqcolor];
		else 
			color=this.colors[this._currState];
		return color;
	}
	set currState(newstate: sqStates) {		this._currState=newstate; }
	
}



export class Board {
	private _squares: Square[];
	
	
	constructor (private _rows: number, private _columns: number) {  		
		this._squares=new Array<Square>();
		let color: sqColor;
		for (let x=0;  x < this._columns; x ++ ) {
			for (let y=0; y< this._rows; y++) {
				color=this.getSquareColor(x,y);					
				this._squares.push(new Square(x,y,color));
			}
		}
	}	
	get rows(): number {
		return this._rows;
	}
	get columns(): number {
		return this._columns;
	}	
	private  getSquareColor(x: number, y: number): sqColor {
		if ((x % 2 ==0  && y % 2 ==0 ) || (x % 2 > 0  && y % 2 >0 )  ) 
			return sqColor.black;
		else 
			return sqColor.white;
	} 
	
	getSquare(x: number, y: number): Square {
		return this._squares.find(elem=>elem.x==x && elem.y==y);
	}
	
	getAllSquares(): Square[] {
		return this._squares;
    }
    clearBoardState(skip: Array<Coord> = null): void {
        this._squares.forEach(sq => {
            if (!(skip && skip.length > 0 && skip.findIndex((v: Coord) => v.x == sq.x && v.y == sq.y) > -1  ) )              
                sq.currState = sqStates.None;
        });
    }
}