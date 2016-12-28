"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var coord_1 = require("./coord");
var Subject_1 = require("rxjs/Subject");
var KnightService = (function () {
    //private moveSubjObserver: Subject<number>;
    //private turns_holder: number[];
    //private MAX_TURNS: number=2;
    function KnightService() {
    }
    /*
    runTimer(): Observable<number> {
        console.log('Current time: ' + Date.now());
        let source = Observable.timer(0,1000).timestamp();
        //var subscription = source.subscribe(x => console.log(x.value + ': ' + x.timestamp));
        return source;
    }
    */
    KnightService.prototype.testObserver = function () {
        var testSubjObserver = new Subject_1.Subject();
        var counter = 0;
        var recfn = function () {
            //all_possible_moves.forEach(function(element,x) 			
            if (counter < 15) {
                setTimeout(recfn, 200);
                display_holder();
                counter++;
            }
        };
        var display_holder = function () {
            console.log(counter);
            testSubjObserver.next(counter);
        };
        recfn();
        return (testSubjObserver.asObservable());
    };
    //console.log("Ready to try the knight from 0,0");
    KnightService.prototype.startKnightPath = function (start, end, MAX_X, MAX_Y) {
        if (MAX_X === void 0) { MAX_X = 8; }
        if (MAX_Y === void 0) { MAX_Y = 8; }
        var turns_holder_arr = new Array(); //hold the array of number of turns for each successful path 		
        var MAX_TURNS = 8;
        var moveSubjObserver = new Subject_1.Subject();
        var generateKnightMoves = function (coord) {
            var moves = new Array();
            moves[0] = new coord_1.Coord(coord.x - 2, coord.y + 1);
            moves[1] = new coord_1.Coord(coord.x - 2, coord.y - 1);
            moves[2] = new coord_1.Coord(coord.x - 1, coord.y - 2);
            moves[3] = new coord_1.Coord(coord.x - 1, coord.y + 2);
            moves[4] = new coord_1.Coord(coord.x + 2, coord.y + 1);
            moves[5] = new coord_1.Coord(coord.x + 2, coord.y - 1);
            moves[6] = new coord_1.Coord(coord.x + 1, coord.y - 2);
            moves[7] = new coord_1.Coord(coord.x + 1, coord.y + 2);
            //return moves that are within board size.
            return moves.filter(function (a) { return a.x > -1 && a.y > -1 && a.y < MAX_Y && a.x < MAX_X; });
        };
        var isCoordEqual = function (coord1, coord2) {
            if (coord1.x == coord2.x && coord1.y == coord2.y)
                return true;
            return false;
        };
        var display_holder = function () {
            //console.log(turns_holder); 
            var turns_min_holder = getMinTurnsArr(turns_holder_arr);
            moveSubjObserver.next(turns_min_holder);
        };
        var isCoordEqual = function (coord1, coord2) {
            if (coord1.x == coord2.x && coord1.y == coord2.y)
                return true;
            return false;
        };
        var getMinTurnsArr = function (tholder) {
            var myArray = tholder.slice();
            if (myArray.length) {
                myArray.sort(function (a, b) {
                    return a.numTurns - b.numTurns;
                });
                var minTurns_1 = myArray[0].numTurns;
                myArray = myArray.filter(function (a) { return a.numTurns == minTurns_1; });
            }
            return myArray;
        };
        var makeKnightMoveAync = function (start_pos, end_pos, turnsholder) {
            turnsholder.pushNewTurn(start_pos);
            if (turns_holder_arr.length && (turns_holder_arr.filter(function (a) { return a.numTurns < turnsholder.numTurns; })).length > 0)
                return; //return since there are paths with less turns in holder. 			
            if (turnsholder.numTurns > MAX_TURNS) {
                return; //forget it  -- too much turns. 
            }
            var all_possible_moves = generateKnightMoves(start_pos);
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
            for (var x = 0; x < all_possible_moves.length; x++) 
            //all_possible_moves.forEach(function(element,x) 
            {
                var turnsholder_new = new TurnsHolder();
                //copy data to new object created for each branch 
                turnsholder_new.numTurns = turnsholder.numTurns;
                turnsholder_new.path = turnsholder.path.slice();
                if (isCoordEqual(all_possible_moves[x], end_pos)) {
                    turnsholder_new.pushNewTurn(end_pos); //push the last turn 
                    turns_holder_arr.push(turnsholder_new); //push this path/turn combo to holder_arr	
                    if (turnsholder_new.numTurns == 1)
                        setTimeout(display_holder, 1);
                    else
                        display_holder();
                }
                else
                    setTimeout(makeKnightMoveAync, 2, all_possible_moves[x], end_pos, turnsholder_new);
            }
        };
        makeKnightMoveAync(start, end, new TurnsHolder());
        return (moveSubjObserver.asObservable());
    };
    return KnightService;
}());
KnightService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], KnightService);
exports.KnightService = KnightService;
var TurnsHolder = (function () {
    function TurnsHolder() {
        this.numTurns = -1; //it is 0 when first coord is pushed.
        this.path = new Array();
    }
    TurnsHolder.prototype.pushNewTurn = function (coord) {
        this.numTurns++;
        this.path.push(coord);
    };
    return TurnsHolder;
}());
exports.TurnsHolder = TurnsHolder;
//# sourceMappingURL=knight.service.js.map