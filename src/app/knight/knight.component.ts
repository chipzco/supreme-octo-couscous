import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Coord, Square, Board, sqStates, sqColor } from  './coord';
import { Observable } from 'rxjs/Observable';  
import { KnightService, TurnsHolder } from './knight.service';
import { WatcherService } from '../watcher.service';

@Component({	  
	moduleId: module.id.toString(),
	selector: 'board',	  
	templateUrl:  './knight.component.html',
	styleUrls: [ './knight.component.scss' ]	
})


export class KnightComponent implements OnInit {
	public mymoves: Array<TurnsHolder>;

    constructor(private knightService: KnightService, private watchService: WatcherService) { }   
	
	board:  Board;	
	squares: Square[];
	cols: number[];
	rows: number[];
    pathSquares: Square[];
    pathSelectSquare: Square;
    pathSelected: number;
    ngOnInit(): void {
        this.pathSelected = -1;
		this.board=new Board(8,8);
		this.squares=this.board.getAllSquares();
		//console.log(this.squares);	
		this.cols=[7,6,5,4,3,2,1,0];
		this.rows=[0,1,2,3,4,5,6,7];
        this.pathSquares = new Array<Square>(); //this is holding start end squares. 
        this.pathSelectSquare = null;
        this.watchService.watchAllTurns.subscribe(a => console.log(" Observing turnsholder length from Knight component " + a));
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
        this.pathSelected = -1;
		this.knightService.startKnightPath(this.pathSquares[0],this.pathSquares[1]).subscribe(a=>this.mymoves=a);
	}	

    colorPath(path: Array<Coord>, event: any, i: number): void {
        //event.target.style.backgroundColor = "green";
        this.pathSelected = i;
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
    getPathClass(ix: number) {
        let cssClasses;
        if (ix == this.pathSelected) {
            cssClasses = {
                'pathMove-select': true,
                'pathMove': true
            }
        } else {
            cssClasses = {
                'pathMove': true,
                'pathMove-select': false
            }
        }
        return cssClasses;
    }	


    colorPathSquareRev(event: any, co: Coord, i: number) {
        if (i == this.pathSelected) {
            event.target.style.backgroundColor = "white";
            let sq: Square = this.board.getSquare(co.x, co.y);
            if (sq.currState == sqStates.Selected)
                sq.currState = sqStates.Path;
        }
    }
    colorPathSquare(event: any, co: Coord, i: number) {
        if (i == this.pathSelected) {                        
            event.target.style.backgroundColor = "red";
            let sq: Square = this.board.getSquare(co.x, co.y);
            if (sq.currState != sqStates.Start && sq.currState != sqStates.End)
                sq.currState = sqStates.Selected;
        }
    }
}





