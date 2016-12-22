import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { myService } from './my-service';
import { AppComponent }  from './app.component';
import {AboutComponent} from './about.component';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule } from './knight/knight.module';
import { TicTacModule } from './tictac/tictac.module';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, KnightModule, TicTacModule ],
  declarations: [ AppComponent , AboutComponent],
  bootstrap:    [ AppComponent ],
  providers: [myService]
})
export class AppModule { }
