import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chat2Component } from './chat2.component';

@NgModule({
    imports: [RouterModule.forChild([        
        { path: 'chat2', component: Chat2Component }
    ])],
    exports: [RouterModule]
})
export class SignalRRoutingModule { }