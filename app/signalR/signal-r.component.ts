import { Component, OnInit } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { ChannelService, ConnectionState } from './channel.service';

@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'signal-r.component.html'	
})


export class SignalRComponent implements OnInit {

    connectionState$: Observable<string>;

    constructor(private channelService: ChannelService) {
        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$.map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.log(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );


    }
      
	ngOnInit(): void {		
        // Start the connection up!
        //
        console.log("Starting the channel service");

        this.channelService.start();
    }
  
}





