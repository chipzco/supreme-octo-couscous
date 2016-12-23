import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor, Coord, Square } from '../knight/coord';
import { Observable } from 'rxjs/Observable';
@Component({
    moduleId: module.id.toString(),
    selector: 'board',
    templateUrl: 'board.component.html',    
    styleUrls: ['tictac.css']	
})

export class Board2 implements OnInit {
    @Input() private _rows: number;
    @Input() private _columns: number;
    @Output() eventBoardref: EventEmitter<Board2> = new EventEmitter<Board2>();
    @Output() eventClickedSquare: EventEmitter<Square> = new EventEmitter<Square>(); 
    numsquares: number;
    mycolor: sqColor;
    rowGen: Array<number>;
    colGen: Array<number>;
    protected _squares: Array<Square>; 
   
    ngOnInit(): void {
        this.numsquares = this._rows * this._columns;
        this.mycolor = sqColor.black; //test
        this.rowGen = new Array<number>();
        this.colGen = new Array<number>();
        this._squares = new Array<Square>();
        //console.log(this._rows);
        for (let c = 0; c < this._rows; c++) {
            let revr = this._rows - 1 - c;
            this.rowGen.push(revr);
        }
        for (let c = 0; c < this._columns; c++) {           
            this.colGen.push(c);
        }
        this.eventBoardref.emit(this);
    }
   
   

    holdSqRef(sqref: Square): void {
        //console.log(" Holding ref to the sq info: " + sqref.alg_not);
        this._squares.push(sqref); //setting the square ref in array in parent (board) from the drawn square. how else to hold squares?
        //sqref.currState = sqStates.Start;
    }
    passclickedSq(clicksqRef: Square): void {
        this.eventClickedSquare.emit(clicksqRef);
        //console.log("passsing square");
    }


    protected getSquareColor(x: number, y: number): sqColor {
        if ((x % 2 == 0 && y % 2 == 0) || (x % 2 > 0 && y % 2 > 0))
            return sqColor.black;
        else
            return sqColor.white;
    }    


    get rows(): number {
        return this._rows;
    }
    get columns(): number {
        return this._columns;
    }
  

    getSquare(x: number, y: number): Square {
        return this._squares.find(elem => elem.x == x && elem.y == y);
    }

    getAllSquares(): Square[] {
        return this._squares;
    }
    clearBoardState(skip: Array<Coord> = null): void {
        this._squares.forEach(sq => {
            if (!(skip && skip.length > 0 && skip.findIndex((v: Coord) => v.x == sq.x && v.y == sq.y) > -1))
                sq.currState = sqStates.None;
        });
    }

}

