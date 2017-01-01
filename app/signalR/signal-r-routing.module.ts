import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import { SignalRComponent } from './signal-r.component';
import { ChatComponent } from './chat.component';
import { Chat2Component } from './chat2.component';

@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'signal', component: SignalRComponent },
      { path: 'chat', component: ChatComponent }	,
	{ path: 'chat2', component: Chat2Component }	      	  
  ])],
  exports: [RouterModule]
})
export class SignalRRoutingModule {}