import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Coord, Square, Board, sqStates, sqColor } from  './coord';
import { Observable } from 'rxjs/Observable';  
import { KnightService, TurnsHolder } from './knight.service';


@Component({	  
	moduleId: module.id.toString(),
	selector: 'board',	  
	templateUrl:  './knight.component.html',
	styleUrls: [ './knight.component.scss' ]	
})


export class KnightComponent implements OnInit {
	public mymoves: Array<TurnsHolder>;
	
	constructor(private knightService: KnightService) {  }   
	
	board:  Board;	
	squares: Square[];
	cols: number[];
	rows: number[];
    pathSquares: Square[];
    pathSelectSquare: Square;
	ngOnInit(): void {		
		this.board=new Board(8,8);
		this.squares=this.board.getAllSquares();
		//console.log(this.squares);	
		this.cols=[7,6,5,4,3,2,1,0];
		this.rows=[0,1,2,3,4,5,6,7];
        this.pathSquares = new Array<Square>(); //this is holding start end squares. 
        this.pathSelectSquare = null;
	}
	getSq(x: number, y: number ) {
		return this.board.getSquare(x,y);
	}
	getClass(x: number, y: number) {
		let classname: string="";
		let sq=this.getSq(x,y);
		if (sq)
			classname=this.getClassfromSq(sq);
		//console.log("x=" + x + " y= " +  y + "class = " + classname);
		return classname;
	}
	getClassfromSq(sq: Square):  string {				
		return "col-md-1 square " + sq.getColor();		
	}
	setPath(x: number, y: number) {
		this.clearPathIfSet();			
		let sq=this.getSq(x,y);
        if (sq) {
            this.board.clearBoardState(this.pathSquares);
			if (!this.pathSquares.length)
				sq.currState=sqStates.Start;
			else 
				sq.currState=sqStates.End;
			this.pathSquares.push(sq);
		}
	}
	squaresSelected() : boolean {
		if (this.pathSquares.length ==2) 
			return true;
		return false;
	}
	clearPathIfSet(): void  {
		if (this.pathSquares.length >=2) {
			for (let sq of this.pathSquares) {
				sq.currState=sqStates.None;				
			}
			this.pathSquares=[];
		}		
	}
	showPaths(): void {
		this.knightService.startKnightPath(this.pathSquares[0],this.pathSquares[1]).subscribe(a=>this.mymoves=a);
	}	

    colorPath(path: Array<Coord>): void {
        this.board.clearBoardState(this.pathSquares); //this.pathSquares
        let x = 0;
        for (let c of path) {
            if (x != 0 && x != path.length-1) {
                let sq = this.board.getSquare(c.x, c.y);
                sq.currState = sqStates.Path;
            }
            x++;
        }
    }
    colorPathSquareRev(event: any, co: Coord) {
        event.target.style.backgroundColor = "white";
        let sq: Square = this.board.getSquare(co.x, co.y);
        //sq.currState = sqStates.Path;
    }
    colorPathSquare(event: any, co: Coord ) {
        
        /*
        if (this.pathSelectSquare) {
            let sqold: Square;
            sqold = this.board.getSquare(this.pathSelectSquare.x, this.pathSelectSquare.y);
            sqold.currState = this.pathSelectSquare.currState;
        }
        */
        //this.pathSelectSquare = new Square(sq.x, sq.y, sq.sqcolor);
        //this.pathSelectSquare.currState = sq.currState;    //store the copy of square and its current state
		event.target.style.backgroundColor="red";
		let sq: Square=this.board.getSquare(co.x,co.y);
        sq.currState = sqStates.Selected;
	}
}





