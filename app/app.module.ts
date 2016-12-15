import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { myService } from './my-service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [myService]
})
export class AppModule { }
