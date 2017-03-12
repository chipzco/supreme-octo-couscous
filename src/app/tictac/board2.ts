import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor, Coord, Square, Board } from '../knight/coord';
import { Observable } from 'rxjs/Observable';
@Component({    
    selector: 'board',
    templateUrl: './board.component.html',    
    styleUrls: ['./tictac.scss']	
})

export class Board2 implements OnInit {
    @Input() private _rows: number;
    @Input() private _columns: number;
    @Input() private colorArr: Array<string>;    
    @Output() eventClickedSquare: EventEmitter<Square> = new EventEmitter<Square>(); 
    numsquares: number;        
    boardInfo: Board;
    private _squares: Array<Square>;   

    get rowGen(): Array<number> {
        return this.boardInfo.rowGen;
    }
    get colGen(): Array<number> {
        return this.boardInfo.colGen;
    }
    ngOnInit(): void {
        this.numsquares = this._rows * this._columns;                
        this.boardInfo = new Board(this._rows, this._columns);
        this._squares = new Array<Square>(); 
    }
    holdSqRef(sqref: Square): void {
        //console.log(" Holding ref to the sq info: " + sqref.alg_not);
        this._squares.push(sqref); //setting the square ref in array in parent (board) from the drawn square. how else to hold squares?
        if (this._squares.length == this.numsquares)
            this.boardInfo.setAllSquares(this._squares);
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
}

