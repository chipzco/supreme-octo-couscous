import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import {TicTacRoutingModule} from './tictac-routing.module';
import { TicTac } from './tictac';
import { Board2 } from './board2';
import { Square2 } from './square';


@NgModule({
    imports: [CommonModule, TicTacRoutingModule],
    declarations: [TicTac, Board2, Square2]  
})
export class TicTacModule { }