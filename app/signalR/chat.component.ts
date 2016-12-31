import { Component, OnInit  } from '@angular/core';
import { JQueryService } from './../jquery.service';
import { Observable } from 'rxjs/Observable';
import { ChatService, MsgClass } from './chat.service';
 
@Component ({
	selector: 'chat',
	moduleId: module.id.toString(),
    templateUrl: './chat.html',
    styleUrls: ['chat.css']   
})


export class ChatComponent implements OnInit { 
    message: string = "";
    messages: Array<string>;
    name: string;   
    msgcomps: Observable<Array<MsgClass>>;
    constructor(private chatservice: ChatService) {
        this.messages = new Array<string>();       
    }
    SendSignal(): void {
        this.chatservice.sendChat(this.name, this.message);
        this.message = "";        
    }
    /*   
    checkData(): void {
        console.log(this.chatservice.msgcomps);
        this.msgcomps.subscribe((arr: Array<MsgClass>)=> { console.log(arr); return arr; });
    }
    */
   
    ngOnInit(): void {
        this.name = " I AMTESTING";
        this.messages = new Array<string>();
        let myms = this.messages;
        this.msgcomps = this.chatservice.msgObs; //this.chatservice.msgcomps;
        this.chatservice.start();
    }	 

 }