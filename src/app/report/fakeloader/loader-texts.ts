export class LoaderTexts {
    constructor(private _processRunningText: string, private _processFinishedText: string, private _errorTxt: string="Server Error!") { }
    get processRunningText(): string {
        return this._processRunningText;
    }
    get processFinishedText(): string {
        return this._processFinishedText;
    }
    get errorText(): string {
        return this._errorTxt;
    }   
}

export enum LoaderStatus {
    Start,Stop,Error
}
