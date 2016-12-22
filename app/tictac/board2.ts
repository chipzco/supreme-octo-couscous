import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor } from '../knight/coord';
import { Observable } from 'rxjs/Observable';
@Component({
    moduleId: module.id.toString(),
    selector: 'board',
    templateUrl: 'board.component.html',    
})

export class Board2 implements OnInit {
    @Input() private rows: number;
    @Input() private columns: number;
    @Output() hiback: EventEmitter<Board2> = new EventEmitter<Board2>();
    numsquares: number;
    mycolor: sqColor;

    ngOnInit(): void {
        this.numsquares = this.rows * this.columns;
        this.mycolor = sqColor.black;
    }
    private hitchild(): void {
        console.log("I hit heree");
        this.hiback.emit(this);
    }

    hitme(): void  {
        this.numsquares = 999;
    }

}

