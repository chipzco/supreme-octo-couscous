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
    winSq: Square;
    draw: boolean;
    ngOnInit(): void {
        this.pathSquares = [];
        this.toPlayX = true;
        this.winner = null;
        this.draw = false;
    }

    holdWinSqRef(sq: Square): void {
        this.winSq=sq;
    }
    checkWinner():  boolean {
        let winExists = false;        
        let compstate: sqStates;
        for (let x of this.board.colGen) {
            if (winExists)
                break;
            for (let y of this.board.rowGen) {
                //console.log("x: " + x + " y " + y);
                let sqR = this.board.getSquare(x, y);
                if (sqR) {
                    if (y == this.board.rows - 1)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState)
                        break;
                    if (y == 0 && (compstate==sqStates.Start || compstate==sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
                else
                    console.log("no square");
            }
        }
        if (!winExists) {
            for (let y of this.board.rowGen) {
                if (winExists)
                    break;
                for (let x of this.board.colGen) {
                    //console.log("x: " + x + " y " + y);
                    let sqR = this.board.getSquare(x, y);
                    if (sqR) {
                        if (x == 0)
                            compstate = sqR.currState;
                        if (compstate != sqR.currState)
                            break;
                        if (x == (this.board.columns -1)  && (compstate == sqStates.Start || compstate == sqStates.End)) {
                            winExists = true;
                            this.winner = compstate;
                            break;
                        }
                    }
                    else
                        console.log("no square");
                }
            }

        }
        //diagonal with equal xy
        if (!winExists) {
            winExists = this.checkWinnerDiagonal1();
        }
        return winExists;
    }

    checkWinnerDiagonal1(): boolean {
        let winExists = false;
        let compstate: sqStates;     
        for (let x = 0; x < this.board.columns; x++) {                        
            let sqR = this.board.getSquare(x, x);
            if (sqR) {
                if (x == 0)
                    compstate = sqR.currState;
                else {
                    if (compstate != sqR.currState)
                        break;
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
    handleSquareClick(clickedsq: Square): void {
        //this.board.clearBoardState();
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
        this.pathSquares.push(clickedsq);
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
}

