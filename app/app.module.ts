import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { myService } from './my-service';
import { AppComponent }  from './app.component';
import {AboutComponent} from './about.component';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule  } from './knight/knight.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule,KnightModule ],
  declarations: [ AppComponent , AboutComponent],
  bootstrap:    [ AppComponent ],
  providers: [myService]
})
export class AppModule { }
