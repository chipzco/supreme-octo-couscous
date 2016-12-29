import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import { SignalRComponent } from './signal-r.component';



@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'signal', component: SignalRComponent }	      
  ])],
  exports: [RouterModule]
})
export class SignalRRoutingModule {}