export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}
export class SignalrWindow extends Window {
    $: any;
}
export class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}

export class MsgClass {
    constructor(public name = '', public message = '') { }
}

