import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
// Add the AuthGuard service
import { AuthGuard } from './auth-guard.service';
import { PublicDealsComponent } from './deals.component';
import { PrivateDealsComponent } from './private-deals.component';
import { DealsViewComponent} from './deals-view.component';
import { DashboardComponent} from './dashboard.component';
import { AboutComponent  } from './about/about.component';



const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'deals', component: PublicDealsComponent },
	{ path: 'about',  component: AboutComponent }, 
	{ path: 'dashboard',  component: DashboardComponent }, 
	{ path: 'special', component: PrivateDealsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
   providers: [AuthGuard]
})
export class AppRoutingModule {} 