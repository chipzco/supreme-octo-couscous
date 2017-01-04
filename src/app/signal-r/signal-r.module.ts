import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRRoutingModule } from './signal-r-routing.module';
import { FormsModule } from '@angular/forms';
import { Chat2Service } from './chat2.service';
import { Chat2Component } from './chat2.component';
import { ChannelConfig, ConnectionState, MsgClass } from './connection-state.enum';

let chatConfig = new ChannelConfig();
chatConfig.url = "http://localhost:60180/signalr";
chatConfig.hubName = "tSRHub";

@NgModule({   imports: [
      CommonModule, SignalRRoutingModule, FormsModule
  ],
  declarations: [Chat2Component],
  providers: [Chat2Service,  { provide: 'chat.config', useValue: chatConfig }]
})
export class SignalRModule { }
