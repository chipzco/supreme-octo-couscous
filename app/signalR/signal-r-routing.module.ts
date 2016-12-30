import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import { SignalRComponent } from './signal-r.component';
import { ChatComponent } from './chat.component';


@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'signal', component: SignalRComponent },
      { path: 'chat', component: ChatComponent }	      	      
  ])],
  exports: [RouterModule]
})
export class SignalRRoutingModule {}