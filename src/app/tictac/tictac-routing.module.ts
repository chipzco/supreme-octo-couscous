import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import   { TicTac }   from './tictac';


@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'tictac', component: TicTac }	
  ])],
  exports: [RouterModule]
})
export class TicTacRoutingModule {}