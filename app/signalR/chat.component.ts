import { Component, OnInit  } from '@angular/core';
import { JQueryService } from './../jquery.service';

@Component ({
	selector: 'chat',
	moduleId: module.id.toString(),
    templateUrl: './chat.html'    
})
export class MsgClass {
    message: string;
    name: string;
}

export class ChatComponent implements OnInit { 
    message: string = "";
    messages: Array<string>;
    name: string;

    msgComp: MsgClass;
    msgcomps: Array<MsgClass>;
    chatConn: any;
    constructor(public jq: JQueryService) {
        this.messages = new Array<string>();
        this.msgcomps = new Array<MsgClass>();
        this.msgComp = new MsgClass();
    }
    SendSignal(): void {
        this.chatConn.server.send(this.name, this.message);
        console.log("trying to send");
    }   
    pushMessage(message: string): void {
        console.log(message);
        //this.messages.push(message);
    }
    ngOnInit(): void {
        this.name = " I AMTESTING";
        this.messages = new Array<string>();
        let myms = this.messages;
        let myf = function (message: string) {
            myms.push(message);
        }
        if (this.jq.JQueryOK) {
            console.log('start init comp jq ok');  
            let $ = this.jq.JQuery;
            this.chatConn = $.connection.octo2Hub;
           
            // Create a function that the hub can call to broadcast messages.
            this.chatConn.client.broadcastMessage = function (name: string, message: string) {                               
                //console.log(message);
                myf(message);
                //this.pushMessage(message);
            };
            $.connection.hub.start().done(function () {
                console.log("connection to hub done");
             }) ;
        }           
    }	
    

 }