import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import {KnightRoutingModule} from './knight-routing.module';
import { KnightComponent }  from './knight.component';
import { KnightService }     from './knight.service';
import { Coord, Board } from  './coord';
import { ObserveComponent } from './observe.component';
import { ObserveService } from './observe.service';


@NgModule({
  imports:      [ CommonModule, KnightRoutingModule],
  declarations: [ KnightComponent, ObserveComponent ],  
  providers:    [ KnightService, ObserveService ]
})
export class KnightModule { }