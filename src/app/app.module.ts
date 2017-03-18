import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule,Headers,Http,RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS,AuthHttp,AuthConfig } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import { KnightModule } from './knight/knight.module';
import { TicTacModule } from './tictac/tictac.module';
import { SignalRModule } from './signal-r/signal-r.module';
import { ReportModule } from './report/report.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { JQueryService } from './jquery.service';
import { WatcherService } from './watcher.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';



export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({ tokenName: 'id_token'}), http, options);
}
@NgModule ({ imports: [CommonModule, BrowserModule, FormsModule, HttpModule, 
		KnightModule, 
		TicTacModule, 
        SignalRModule, 
        ReportModule,
		AppRoutingModule, ], 
		declarations: [  AppComponent, AboutComponent], 
        providers: [WatcherService,JQueryService,AuthService,AuthGuard,
				{
					provide: AuthHttp,
					useFactory: authHttpServiceFactory,
					deps: [Http, RequestOptions]
				}   
		], 
		bootstrap: [AppComponent] 
})
export class AppModule { }

/*
{
		  provide: AuthHttp,
		  useFactory: authHttpServiceFactory,
		  deps: [Http, RequestOptions]
		}  
		  */


