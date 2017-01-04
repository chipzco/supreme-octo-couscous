import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import   { KnightComponent }   from './knight.component';
import { ObserveComponent } from './observe.component';

@NgModule({
  imports: [RouterModule.forChild([    
	{ path: 'knight', component: KnightComponent },
	{ path: 'observe', component: ObserveComponent },
  ])],
  exports: [RouterModule]
})
export class KnightRoutingModule {}