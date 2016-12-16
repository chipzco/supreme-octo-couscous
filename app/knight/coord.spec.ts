import { sqStates, sqColor,Coord,Square,Board } from './coord';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

	
describe('Test WHITE squares', () => {

  beforeEach(function() {
    this.testSquare = new Square(3,4,sqColor.white);
  });

  it('should have right color property set', function() {
    expect(this.testSquare.getColor()).toBe('white');
  });
	
   it('should have right color for state set: ' + sqStates.Selected +	 'color: orange' , function() {
	
	this.testSquare.currState=sqStates.Selected;
    expect(this.testSquare.getColor()).toBe('orange');
  });
    let mycolor='blue';
   it('should have right color for state set ' + sqStates.End + ' color: '  + mycolor, function() {
	   
		this.testSquare.currState=sqStates.End;
		expect(this.testSquare.getColor()).toBe(mycolor);
  }); 
  
let  mycolor2='grey';
   it('should have right color for state set= ' + sqStates.Path  + ' color: ' +	mycolor2, function() {
		
		this.testSquare.currState=sqStates.Path;
		expect(this.testSquare.getColor()).toBe(mycolor2);
  }); 
  let mycolor3='white';
   it('should have right color for state set= ' + sqStates.None  + ' color: ' +	mycolor3, function() {
		
		this.testSquare.currState=sqStates.None;
		expect(this.testSquare.getColor()).toBe(mycolor3);
  }); 
  
});

describe('Test BLACK squares', () => {
    beforeEach(function () {
        this.testSquare = new Square(3, 4, sqColor.black);
    });
    it('should have right color property set', function () {
        expect(this.testSquare.getColor()).toBe('black');
    });

    describe('testing colors through looping', () => {
        this.testSquare = new Square(3, 4, sqColor.black);        
        for (let x in this.testSquare.colors) {                        
            let errorSet = false;
            let testSquareColor = '';            
            try {
                this.passThisState = sqStates[x]; //this is actually the string- have not clue what this is...
                this.testSquare.currState = x; //this is the number that must be set .
                testSquareColor = this.testSquare.getColor();
             }
             catch (e) { errorSet = true; }             
             it('Expect being able to SET pass state from Color index: ' + x , function () {
                expect(errorSet).toBe(false);
            });
             it('Expect pass this state to be string', function () {
                 expect(this.passThisState).toBeNaN;
             });
             it('*** pass this STATE to be equal to what it set to...apparantly not! ', function () {
                 expect(this.passThisState).toBe(sqStates[x]);
             });

              it('Expect this.passThisState to be defined' + x, function () {
                expect(this.passThisState).toBeDefined;
              });
              it('expect this.testsquare to be dfined', function () {
                  expect(this.testSquare.currState).toBeDefined;
              }); 
              it('expect the state to be set to what was passed in', function () {
                  expect(this.testSquare.currState).toBe(this.passThisState);
              });
                           
             it('expect this.testsquare to be of Right Color pertaining to index:  ' + x , function () {
                if (!errorSet) {                        
                    expect(testSquareColor).toBe(this.testSquare.colors[x]);
                }
                else {
                    expect(true).toBe(false);
                }
              });                
        }
   });

});

