﻿import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { JQueryService } from './../jquery.service';


export class MsgClass {
    constructor(public name: string = "",public message: string="" ) { } 
}

@Injectable()
export class ChatService {
    msgComp: MsgClass;
    msgcomps: Array<MsgClass>;
    chatConn: any;
    hubOK: boolean;
    private startingSubject = new Subject<any>();
    constructor(private jq: JQueryService) {
        this.hubOK = false;
        this.msgcomps = new Array<MsgClass>();
        this.msgComp = new MsgClass();        
        if (this.jq.JQueryOK) {
            let $ = this.jq.JQuery;
            console.log('start init comp jq ok');
            this.chatConn = $.connection.octo2Hub;            
        }
        this.startingSubject.subscribe(() => this.hubOK = true);
    }
    start(): void {
        if (this.jq.JQueryOK) {
            let $ = this.jq.JQuery;
            // Create a function that the hub can call to broadcast messages.
            let myms = this.msgcomps;
            let mySub = this.startingSubject;
            let myf = function (name: string, message: string) {
                myms.push(new MsgClass(name, message));
                console.log(myms);
            }
            if (this.chatConn) {
                this.chatConn.client.broadcastMessage = function (name: string, message: string) {
                    myf(name, message);
                };
                $.connection.hub.start().done(function () {
                    console.log("connection to hub done");
                    mySub.next(true);                    
                });
            }
        }     
    }
    sendChat(name: string, message: string): void  {
        if (this.hubOK) this.chatConn.server.send(name, message);
    }
     
}