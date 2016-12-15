import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent }  from './app.component';
import { HeroesModule } from './heroes/heroes.module';
import { DealService } from './deal.service';
import { AuthService } from './auth.service';
import { AppRoutingModule }     from './app-routing.module';
import { PublicDealsComponent } from './deals.component';
import { PrivateDealsComponent } from './private-deals.component';
import { DealsViewComponent} from './deals-view.component';
import { DashboardComponent} from './dashboard.component';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './heroes/in-memory-data.service';

import { AboutComponent  } from './about/about.component';
@NgModule({
  imports: [ BrowserModule, HttpModule, AppRoutingModule, HeroesModule,
		//InMemoryWebApiModule.forRoot(InMemoryDataService)
		],
  declarations: [
	AppComponent, 
	DealsViewComponent,
	PrivateDealsComponent,
	PublicDealsComponent,
	DashboardComponent,
	AboutComponent
   ],
  providers: [ 
	DealService,
	AuthService,
	AUTH_PROVIDERS
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
