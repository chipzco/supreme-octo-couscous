import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { SignalRRoutingModule } from './signal-r-routing.module';
import { FormsModule } from '@angular/forms';
import { SignalRComponent } from './signal-r.component';
import { TaskComponent } from "./task.component";
import { ChatComponent } from './chat.component';
import { ChannelService, ChannelConfig, SignalrWindow } from './channel.service';
let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";
@NgModule({
    imports: [CommonModule, SignalRRoutingModule, FormsModule],
  declarations: [SignalRComponent, TaskComponent, ChatComponent],
  providers: [ChannelService,              
				 { provide: 'channel.config', useValue: channelConfig }
             ]    
})
export class SignalRModule { }