import { AppComponent } from './app.component';
import { myService } from './my-service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

	
describe('Test MyService', () => {

  beforeEach(function() {
    this.testService = new myService();
  });

  it('should have name property set', function() {
    expect(this.testService.name).toBe('Injected Service');
  });
  it('should give number ', function() {
    expect(this.testService.checknum()).toBe(-800);
  });

  /*
  beforeEach(() => addProviders([myService]);
  
   it('should have name property set', inject([myService], (testService: myService) => {
    expect(testService.name).toBe('Injected Service');
  })); 
  
  */
  /*
  it('should give number ', inject([myService], (testService: myService) => {
    expect(testService.checknum()).toBe('-800');
  }));*/
});
/*
describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);		
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );
  it('should have variable name',()=>expect(comp.name).toBeDefined());
  it('should have expected <h1> text', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/Hello/i,
      '<h1> should say something about "Hello"');
  });
});
*/