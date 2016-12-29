import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { myService } from './my-service';
import { JQueryService, WindowExtend, JQMinSpec, myFu } from './jquery.service';
import { AppComponent }  from './app.component';
import {AboutComponent} from './about.component';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule } from './knight/knight.module';
import { TicTacModule } from './tictac/tictac.module';
import { ReportModule } from './reports/report.module';
import { SignalRModule } from './signalR/signal-r.module';
declare var window: WindowExtend;
window.$ = new myFu();
@NgModule({
  imports: [BrowserModule, HttpModule, KnightModule, TicTacModule, ReportModule, SignalRModule, AppRoutingModule] ,
  declarations: [ AppComponent , AboutComponent],
  bootstrap:    [ AppComponent ],
  providers: [myService, JQueryService, { provide: WindowExtend, useValue: window }]
})
export class AppModule { }
