import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { SignalRRoutingModule } from './signal-r-routing.module';
import { FormsModule } from '@angular/forms';
import { SignalRComponent } from './signal-r.component';
import { TaskComponent } from "./task.component";
import { ChatComponent } from './chat.component';
import { Chat2Component } from './chat2.component';
import { ChannelService, ChannelConfig, SignalrWindow } from './channel.service';
import { Chat2Service } from './chat2.service';
import { ChatService } from './chat.service';
let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";
let chatConfig = new ChannelConfig();
chatConfig.url = "http://localhost:60180/signalr";
chatConfig.hubName = "tSRHub";

@NgModule({
    imports: [CommonModule, SignalRRoutingModule, FormsModule],
  declarations: [SignalRComponent, TaskComponent, ChatComponent,Chat2Component],
  providers: [ChatService,
      Chat2Service,
      { provide: 'chat.config', useValue: chatConfig },
       ChannelService,              
	     { provide: 'channel.config', useValue: channelConfig }
       ]    
})
export class SignalRModule { }