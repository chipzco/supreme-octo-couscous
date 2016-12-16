import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Coord, Square, Board, sqStates, sqColor } from  './coord';
import { Observable } from 'rxjs/Observable';  
import { KnightService, TurnsHolder } from './knight.service';


@Component({	  
	moduleId: module.id,
	selector: 'board',	  
	templateUrl:  'knight.component.html',
	styleUrls: [ 'knight.component.css' ]	
})


export class KnightComponent implements OnInit {
	public mymoves: Array<TurnsHolder>;
	
	constructor(private knightService: KnightService) {  }   
	
	board:  Board;	
	squares: Square[];
	cols: number[];
	rows: number[];
	pathSquares: Square[];
	ngOnInit(): void {		
		this.board=new Board(8,8);
		this.squares=this.board.getAllSquares();
		console.log(this.squares);	
		this.cols=[7,6,5,4,3,2,1,0];
		this.rows=[0,1,2,3,4,5,6,7];
		this.pathSquares=new Array<Square>();
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
	
}





