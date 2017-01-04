import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ObserveService } from './observe.service';
import { KnightService, TurnsHolder } from './knight.service';
import { Coord } from './coord';

@Component({   
    selector: 'has-a-form',
    template: `{{myvar}}   {{timestamp}}  <br/> My Move Number:
	<div *ngFor="let t of mymoves; let i=index;">
		Min Num Turns: {{ t.numTurns }}  <br/>
		<b>{{i}}:</b> <span *ngFor="let sq of t.path; let fin=last">{{ sq.alg_not }} <i *ngIf="!fin">to </i></span> 
	</div>`
})
export class ObserveComponent implements OnInit {
    public myvar: number;	
	public timestamp: number;
	public anobject: any;
	public mymoves: Array<TurnsHolder>;
	constructor(private observeService: ObserveService, private knightService: KnightService) { this.myvar=5; }   
	
	ngOnInit(): void {  
		
		//this.observeService.runTimer().subscribe(a=> { this.myvar=a.value; this.timestamp=a.timestamp; this.anobject=a; console.log(a) } );
		
		var A=new Coord(0,0);
		var B=new Coord(7,7);
		this.knightService.startKnightPath(A,B).subscribe(a=>this.mymoves=a);
		this.knightService.testObserver().subscribe(a=>this.myvar=a);
	}
	
}