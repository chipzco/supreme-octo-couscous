export class Coord {	
	private _algebraic_letter: string;
   	private _algebraic_num: number;
	public currColor: string="";
    constructor(public x: number,public y: number, public color: string="") {  
		if (x>=0 && x < 26)
			this._algebraic_letter=String.fromCharCode(97 + x);
		else 
			this._algebraic_letter="";
		this._algebraic_num=y+1;
		this.currColor=this.color;	
	}
	get alg_not() {
		return this._algebraic_letter + this._algebraic_num.toString();
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