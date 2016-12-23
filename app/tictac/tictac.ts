import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor,Square, Board } from  '../knight/coord';
import { Observable } from 'rxjs/Observable'; 
import { Board2 } from './board2';

@Component({	  
	moduleId: module.id.toString(),
	selector: 'tictac',	  
	templateUrl:  './tictac.component.html',
	styleUrls: [ 'tictac.css' ]	
})

export class TicTac implements OnInit {           
    board: Board;	
    pathSquares: Square[];
    toPlayX: boolean;
    winner: sqStates;
    winSqColor: sqColor = sqColor.white;    
    colorArr: Array<string> = ['whiteorblack', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-adjust', 'grey', 'orange'];
    winSq: Square;
    winPath: Square[];
    draw: boolean;
    inHistory: boolean;
    ngOnInit(): void {
        this.pathSquares = [];
        this.toPlayX = true;
        this.winner = null;
        this.draw = false;
        this.inHistory = false;
        this.winPath = [];
    }

    holdWinSqRef(sq: Square): void {
        this.winSq = sq;
        //console.log(sq);
    }
    checkWinner():  boolean {
        let winExists = this.checkWinnerCols();
        if (!winExists) {
            winExists = this.checkWinnerRows();
        }
        //diagonal with equal xy
        if (!winExists) {
            winExists = this.checkWinnerDiagonal1();
        }
        if (!winExists) {
            winExists = this.checkWinnerDiagonal2();
        }
        if (winExists) {
            for (let m of this.winPath) {
                m.currState = sqStates.Selected;
            }
        }
        else 
            this.winPath = [];
        return winExists;
    }

    checkWinnerCols(): boolean {
        let winExists = false;
        let compstate: sqStates;
        for (let x of this.board.colGen) {
            if (winExists)
                break;
            this.winPath = [];
            for (let y of this.board.rowGen) {
                //console.log("x: " + x + " y " + y);
                let sqR = this.board.getSquare(x, y);                
                if (sqR) {
                    if (y == this.board.rows - 1)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    this.winPath.push(sqR);
                    if (y == 0 && (compstate == sqStates.Start || compstate == sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }              
            }
        }
        return winExists
    }
    checkWinnerRows(): boolean {
        let winExists = false;
        let compstate: sqStates;     
        for (let y of this.board.rowGen) {
            if (winExists)
                break;
            this.winPath = [];
            for (let x of this.board.colGen) {
                //console.log("x: " + x + " y " + y);
                let sqR = this.board.getSquare(x, y);
                if (sqR) {
                    if (x == 0)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    this.winPath.push(sqR);
                    if (x == (this.board.columns - 1) && (compstate == sqStates.Start || compstate == sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }                
            }
        }
        return winExists;
    }

    checkWinnerDiagonal1(): boolean {
        let winExists = false;
        let compstate: sqStates;     
        this.winPath = [];
        for (let x = 0; x < this.board.columns; x++) {                        
            let sqR = this.board.getSquare(x, x);
            if (sqR) {
                this.winPath.push(sqR);
                if (x == 0)
                    compstate = sqR.currState;
                else {
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }                   
                    if (x == (this.board.columns - 1) && (compstate == sqStates.Start || compstate == sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }           
        }
        return winExists;
    }

    checkWinnerDiagonal2(): boolean {
        let winExists = false;
        let compstate: sqStates;
        let y = -1;
        this.winPath = [];
        for (let x = this.board.columns - 1; x >= 0; x--) {
            y++;
            let sqR = this.board.getSquare(x, y);
            if (sqR) {
                this.winPath.push(sqR);
                if (y==0)
                    compstate = sqR.currState;
                else {
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }                   
                    if (x == 0 && (compstate == sqStates.Start || compstate == sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }
        }
        return winExists;
    }


    checkDraw(): boolean {
        //assume that you check for win first.
        if (!(this.board.getAllSquares().findIndex(sq => sq.currState == sqStates.None) >-1))
            this.draw = true;
        return this.draw;
    }

     setBoard(boardobj: Board): void {
         this.board = boardobj;        
        // console.log(boardobj);
    }
     pushToHistory(clickedsq: Square): void {
         let sq_copy = new Square(clickedsq.x, clickedsq.y, clickedsq.sqcolor);
         sq_copy.currState = clickedsq.currState;
         this.pathSquares.push(sq_copy);
     }
    handleSquareClick(clickedsq: Square): void {
        //this.board.clearBoardState();
        if (this.inHistory) {
            console.log("In HISTORY CANNOT PLAY");
            return;
        }
        if (this.winner || this.draw) {
            console.log("GAME OVER");
            return;
        }		
        let isAlreadyClicked = false;
        if (this.pathSquares && this.pathSquares.length && this.pathSquares.findIndex(sq => sq.x == clickedsq.x && sq.y == clickedsq.y) >-1 )
            isAlreadyClicked = true;
        if (isAlreadyClicked)
            return;
        if (this.toPlayX)
            clickedsq.currState = sqStates.Start;
        else
            clickedsq.currState = sqStates.End;
        this.pushToHistory(clickedsq);
        
        this.toPlayX = !this.toPlayX;
        let iswinner = this.checkWinner();
        if (iswinner) {
            this.winSq.currState = this.winner;
            console.log("WINNER FOUND");
			return;
        }	
        if (this.checkDraw()) {
            console.log("DRAW!!!");
            return;
        }	
     }
    gotoCurrent(): void {
        for (let m = 0; m < this.pathSquares.length; m++) {
            let sqref = this.board.getSquare(this.pathSquares[m].x, this.pathSquares[m].y);
            sqref.currState = this.pathSquares[m].currState;            
        }
        this.inHistory = false;
        console.log("reset to current board");
    }
    clearBoard(): void {
        this.inHistory = false;
        this.board.clearBoardState();        
    }
    startover(): void {
        this.clearBoard();
        this.winner = null;
        this.winPath = [];
        this.pathSquares = [];
        this.draw = false;
        this.winSq.currState = sqStates.None;
    }
    getHistory(i: number): void {
        console.log(" GO BACK IN HISTORY TO MOVE #" + i);
        if (i < this.pathSquares.length) {
            this.board.clearBoardState();
            if (i == this.pathSquares.length - 1)
                this.inHistory = false;
            else 
                this.inHistory = true;
            for (let m = 0; m <= i; m++) {
                let sqref = this.board.getSquare(this.pathSquares[m].x, this.pathSquares[m].y);
                sqref.currState = this.pathSquares[m].currState;
            }
        }
    }
}

