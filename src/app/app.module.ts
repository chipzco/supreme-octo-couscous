import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule } from './knight/knight.module';
import { TicTacModule } from './tictac/tictac.module';
import { SignalRModule } from './signal-r/signal-r.module';
import { JQueryService, WindowExtend, JQMinSpec } from './jquery.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';

@NgModule({ imports: [CommonModule,BrowserModule, FormsModule, HttpModule,  KnightModule, TicTacModule, SignalRModule,AppRoutingModule, ], declarations: [  AppComponent, AboutComponent ], providers: [JQueryService, { provide: WindowExtend, useValue: window }], bootstrap: [AppComponent] })
export class AppModule { }
