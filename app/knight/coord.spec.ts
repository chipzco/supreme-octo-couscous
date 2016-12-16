import { sqStates, sqColor,Coord,Square,Board } from './coord';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

	
describe('Test squares', () => {

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
