import { Component, OnInit  } from '@angular/core';
import { JQueryService } from './../jquery.service';
import { Observable } from 'rxjs/Observable';
import { Chat2Service } from './chat2.service';
import { MsgClass } from './chat.service';
import {  ChannelConfig,ConnectionState } from './channel.service';
@Component ({
	selector: 'chat',
	moduleId: module.id.toString(),
    templateUrl: './chat.html',
    styleUrls: ['chat.css']   
})


export class Chat2Component implements OnInit { 
    message: string = "";
    messages: Array<string>;
    name: string;  
	connectionState$: Observable<string>;	
    msgcomps: Observable<Array<MsgClass>>;
    constructor(private chatservice: Chat2Service) {
        this.messages = new Array<string>();      
		  this.connectionState$ = this.chatservice.connectionState$.map((state: ConnectionState) => { return ConnectionState[state]; });
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