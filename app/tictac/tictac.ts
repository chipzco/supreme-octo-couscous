import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor } from  '../knight/coord';
import { Observable } from 'rxjs/Observable'; 
import { Board2 } from './board2';
@Component({	  
	moduleId: module.id.toString(),
	selector: 'tictac',	  
	templateUrl:  'tictac.component.html',
	styleUrls: [ 'tictac.css' ]	
})

export class TicTac implements OnInit {           
  

    ngOnInit(): void {

    }

    hitbacktochild(boardobj: Board2): void {
        console.log('I am in parent');        
        boardobj.hitme();
        boardobj.mycolor = sqColor.white;
    }
}

