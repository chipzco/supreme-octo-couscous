import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Observable';  
import { Coord } from './coord';
import { Subject } from 'rxjs/Subject';
import { WatcherService } from '../watcher.service';


@Injectable()
export class KnightService {
	
  
	//private moveSubjObserver: Subject<number>;
    //private turns_holder: number[];
	//private MAX_TURNS: number=2;
	
    constructor(private watcherservice: WatcherService) { 
		
	}
	
	/*
	runTimer(): Observable<number> {  
		console.log('Current time: ' + Date.now());
		let source = Observable.timer(0,1000).timestamp();
		//var subscription = source.subscribe(x => console.log(x.value + ': ' + x.timestamp));
		return source;
	}
	*/
	testObserver(): Observable<number> {
		let testSubjObserver=new Subject<number>();		
		let counter=0;
		let  display_holder=function(): void { 	
			console.log(counter); 						
			testSubjObserver.next(counter);	
		}
		let recfn=function() {
			//all_possible_moves.forEach(function(element,x) 			
			if (counter < 15)  {
				setTimeout(recfn, 200);
				display_holder();
				counter++;
			}			
		}
		
		recfn();		
		return (testSubjObserver.asObservable());
	}
	
	//console.log("Ready to try the knight from 0,0");
	
	
	

	
	
	startKnightPath(start: Coord, end: Coord, MAX_X: number=8, MAX_Y: number=8): Observable<Array<TurnsHolder>> {		
		let turns_holder_arr=new Array<TurnsHolder>();  //hold the array of number of turns for each successful path 		
		const MAX_TURNS=8;
        let moveSubjObserver = new Subject<Array<TurnsHolder>>();
        
		var generateKnightMoves=function(coord: Coord):  Coord[] {
			let moves=new Array<Coord>();
			moves[0]=new Coord(coord.x-2,coord.y+1);
			moves[1]=new Coord(coord.x-2,coord.y-1);
			moves[2]=new Coord(coord.x-1,coord.y-2);
			moves[3]=new Coord(coord.x-1,coord.y+2);	
			moves[4]=new Coord(coord.x+2,coord.y+1);
			moves[5]=new Coord(coord.x+2,coord.y-1);
			moves[6]=new Coord(coord.x+1,coord.y-2);
			moves[7]=new Coord(coord.x+1,coord.y+2);	
			//return moves that are within board size.
			return moves.filter(a=>a.x>-1 && a.y >-1 &&  a.y < MAX_Y && a.x < MAX_X);
		}
		var isCoordEqual=function(coord1: Coord,coord2: Coord):  boolean {
			if (coord1.x==coord2.x && coord1.y==coord2.y)
				return true;
			return false;	
        }
        let tmpWatchSvc = this.watcherservice;
        let sendEvent = function (turns_holder_count: number): void {
            tmpWatchSvc.addValWatchAllTurns(turns_holder_count);
        }
		var display_holder=function(): void { 	
			//console.log(turns_holder); 
			let turns_min_holder=getMinTurnsArr(turns_holder_arr);			
            moveSubjObserver.next(turns_min_holder);	
            //add to event
            sendEvent(turns_min_holder.length);            
		}
        

		let getMinTurnsArr=function (tholder: Array<TurnsHolder>): Array<TurnsHolder> {		
			let myArray=tholder.slice();
			if (myArray.length) {
				myArray.sort(function (a, b) {		
					return a.numTurns - b.numTurns;
				})	
			   let minTurns=myArray[0].numTurns;
			   myArray=myArray.filter(a=>a.numTurns==minTurns);		
			}
			return myArray;
		}     

		
		var makeKnightMoveAync=function(start_pos: Coord,end_pos: Coord,turnsholder: TurnsHolder): void {				
			turnsholder.pushNewTurn(start_pos); 
			if (turns_holder_arr.length && (turns_holder_arr.filter(a=>a.numTurns < turnsholder.numTurns)).length>0)
				return ;  //return since there are paths with less turns in holder. 			
			if (turnsholder.numTurns > MAX_TURNS) {		
				return;   //forget it  -- too much turns. 
			}	
			var all_possible_moves=generateKnightMoves(start_pos);
			
			/*
			var pathok=(all_possible_moves.filter(a=>isCoordEqual(a,end_pos))).length;
			if (pathok > 0) {		
				turns_holder_arr.push(turns);
				if (turns==1)
					setTimeout(display_holder,1);	 
				else 
					display_holder();
			}
			*/			
			for (var x=0; x< all_possible_moves.length; x++) 
			//all_possible_moves.forEach(function(element,x) 
			{   
				let turnsholder_new: TurnsHolder=new TurnsHolder(); 
				//copy data to new object created for each branch 
				turnsholder_new.numTurns=turnsholder.numTurns;
				turnsholder_new.path=turnsholder.path.slice();
				
				if (isCoordEqual(all_possible_moves[x],end_pos)) {
					turnsholder_new.pushNewTurn(end_pos); //push the last turn 
					turns_holder_arr.push(turnsholder_new); //push this path/turn combo to holder_arr	
					if (turnsholder_new.numTurns==1)
						setTimeout(display_holder,1);	 
					else 
						display_holder();	
				}
				else //or pass recursively where the new turn would be pushed again	
					setTimeout(makeKnightMoveAync, 2, all_possible_moves[x],end_pos,turnsholder_new);			
			}	
		}	
		
        makeKnightMoveAync(start, end, new TurnsHolder());
        let myshared: Observable<Array<TurnsHolder>> = moveSubjObserver.asObservable().share();        
        return myshared;
	}		
}
  
  
  
  
export class TurnsHolder {
	path: Coord[];	
	numTurns: number;
	constructor() { 
		this.numTurns=-1; //it is 0 when first coord is pushed.
		this.path=new Array<Coord>();		
	}
	pushNewTurn(coord: Coord): void {
		this.numTurns++;
		this.path.push(coord);
	} 	
 } 
