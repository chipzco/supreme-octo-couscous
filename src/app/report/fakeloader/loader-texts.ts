export class LoaderTexts {
    constructor(private _processRunningText: string, private _processFinishedText: string) { }
    get processRunningText(): string {
        return this._processRunningText;
    }
    get processFinishedText(): string {
        return this._processFinishedText;
    }
}
