import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operator/map';
import { Subject, Observable } from 'rxjs/Rx';
import { JQueryService } from './../jquery.service';
import { ChannelConfig, ConnectionState, MsgClass } from './connection-state.enum';
@Injectable()
export class Chat2Service {
    msgComp: MsgClass;  
    private msgcomps: Array<MsgClass>;
    chatConn: any;
    hubOK: boolean;
    private startingSubject = new Subject<boolean>();
    private connectionStateSubject = new Subject<ConnectionState>();
    private msgSubject = new Subject<Array<MsgClass>>();
    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;
    private hubProxy: any;
    constructor(private jq: JQueryService,
        @Inject("chat.config") private chatConfig: ChannelConfig) {
        this.hubOK = false;
        this.msgcomps = new Array<MsgClass>();
        this.msgComp = new MsgClass();
        if (this.jq.JQueryOK) {
            let $ = this.jq.JQuery;
            console.log('start init comp jq ok');
            this.hubConnection = $.hubConnection();
            this.hubConnection.url = chatConfig.url;
            this.hubProxy = this.hubConnection.createHubProxy(chatConfig.hubName);
            if (this.hubConnection) {
                this.hubConnection.stateChanged((state: any) => {
                    let newState = ConnectionState.Connecting;
                    switch (state.newState) {
                        case $.signalR.connectionState.connecting:
                            newState = ConnectionState.Connecting;
                            break;
                        case $.signalR.connectionState.connected:
                            newState = ConnectionState.Connected;
                            break;
                        case $.signalR.connectionState.reconnecting:
                            newState = ConnectionState.Reconnecting;
                            break;
                        case $.signalR.connectionState.disconnected:
                            newState = ConnectionState.Disconnected;
                            break;
                    }
                    // Push the new state on our subject
                    //
                    this.connectionStateSubject.next(newState);
                });
                let myms = new Array<MsgClass>(); //this.msgcomps;

                let mymsgSub = this.msgSubject;
                let myf = function (name: string, message: string) {
                    myms.push(new MsgClass(name, message));
                    mymsgSub.next(myms);
                }
                this.hubProxy.on("broadcastMessage", (name: string, message: string) => {
                    myf(name, message);
                });
            }

        }
        this.startingSubject.subscribe(() => this.hubOK = true);
    }

    get msgObs(): Observable<Array<MsgClass>> {
        return this.msgSubject.asObservable();
    }
    get connectionState$(): Observable<ConnectionState> {
        return this.connectionStateSubject.asObservable();
    }

    start(): void {


        // Create a function that the hub can call to broadcast messages.
        let mySub = this.startingSubject;
        this.hubConnection.start().done(function () {
            console.log("connection to hub done");
            mySub.next(true);
        });



    }
    sendChat(name: string, message: string): void {
        if (this.hubOK) this.hubProxy.invoke("send", name, message);
        else { console.log("Hub is not setup"); }
    }

}