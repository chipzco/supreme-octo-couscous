import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor,Square } from  '../knight/coord';
import { Observable } from 'rxjs/Observable'; 
import { Board2 } from './board2';
@Component({	  
	moduleId: module.id.toString(),
	selector: 'tictac',	  
	templateUrl:  './tictac.component.html',
	styleUrls: [ 'tictac.css' ]	
})

export class TicTac implements OnInit {           
    board: Board2;	
    pathSquares: Square[];
    toPlayX: boolean;
    ngOnInit(): void {
        this.pathSquares = [];
        this.toPlayX = true;
    }

     setBoard(boardobj: Board2): void {
         this.board = boardobj;        
        // console.log(boardobj);
    }
    handleSquareClick(clickedsq: Square): void {
        //this.board.clearBoardState();
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
    }

}

