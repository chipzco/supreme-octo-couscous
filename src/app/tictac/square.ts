import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { sqStates, sqColor, Coord, Square } from '../knight/coord';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id.toString(),
    selector: 'square',
    templateUrl: './square.component.html',
    styleUrls: ['./tictac.css']	
})

export class Square2 implements OnInit {	
	protected sqInfo: Square;  
    @Input() sqcolor: sqColor;
    @Input() x: number; 
    @Input() y: number; 
    @Input() colors: Array<string>;
    @Output() instanceSq: EventEmitter<Square> = new EventEmitter<Square>();
    @Output() clickedSq: EventEmitter<Square>=new EventEmitter<Square>();
    ngOnInit(): void {
        this.sqInfo = new Square(this.x, this.y, this.sqcolor);       
        this.sqInfo.colors = this.colors;
        this.instanceSq.emit(this.sqInfo);
    } 
    onClick(): void {
        //console.log('hi');
        this.clickedSq.emit(this.sqInfo);
        //console.log(this.sqInfo);
    }
    getValue(): string {
        let val: string = "";
        if (this.sqInfo.currState == sqStates.Start)
            val = "X";
        else if (this.sqInfo.currState == sqStates.End)
            val = "O";
        return val;
    }   
    getColor(): string{
        return this.sqInfo.getColor();
    }
    set currState(newstate: sqStates) { this.sqInfo.currState = newstate; }	

    get alg_not() { return this.sqInfo.alg_not; } 

    getClassfromSq(sq: Square): string {        
        let classname = "col-md-1 square " + this.getColor();
        //console.log(classname);
        return classname;
    }

   
}



