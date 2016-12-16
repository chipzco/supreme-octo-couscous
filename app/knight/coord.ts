const enum sqStates {
	None,
	Start,
	End, 
	Path, 
	Selected
}
enum sqColor { white, black  }

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
	protected _sqColor: number;	
	protected _currState: number;
	colors: Array<string>;
	constructor(public x: number,public y: number, public sqcolor: number) {
		super(x,y);		
		let squareColor=[sqColor[sqcolor];
		this.colors=[squareColor,'green','Blue','#eeeeee','orange'];				
		this._currState=sqStates.None;
	}	
	getColor(): string {
		color: string="";
		if (this.)
	}
}



export class Board {
	private _squares: Coord[];
	
	
	constructor (private _rows: number, private _columns: number) {  		
		this._squares=new Array<Coord>();
		let color: string="";
		for (let x=0;  x < this._columns; x ++ ) {
			for (let y=0; y< this._rows; y++) {
				color=this.getSquareColor(x,y);					
				this._squares.push(new Coord(x,y,color));
			}
		}
	}	
	get rows(): number {
		return this._rows;
	}
	get columns(): number {
		return this._columns;
	}	
	private  getSquareColor(x: number, y: number): string {
		if ((x % 2 ==0  && y % 2 ==0 ) || (x % 2 > 0  && y % 2 >0 )  ) 
			return "black";
		else 
			return "white";
	} 
	
	getSquare(x: number, y: number): Coord {
		return this._squares.find(elem=>elem.x==x && elem.y==y);
	}
	
	getAllSquares(): Coord[] {
		return this._squares;
	}
}