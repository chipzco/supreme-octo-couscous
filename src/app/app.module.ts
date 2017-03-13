import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule } from './knight/knight.module';
import { TicTacModule } from './tictac/tictac.module';
import { SignalRModule } from './signal-r/signal-r.module';
import { ReportModule } from './report/report.module';
import { JQueryService } from './jquery.service';
import { WatcherService } from './watcher.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { window_cover } from  './window-ref';
@NgModule ({ imports: [CommonModule, BrowserModule, FormsModule, HttpModule, 
		KnightModule, 
		TicTacModule, 
        SignalRModule, 
        ReportModule,
		AppRoutingModule, ], 
		declarations: [  AppComponent, AboutComponent], 
        providers: [WatcherService,JQueryService,window_cover], 
		bootstrap: [AppComponent] 
})
export class AppModule { }


