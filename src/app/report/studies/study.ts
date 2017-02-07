export class Study {
    constructor(
        public id: number,
        public protocol: string,
        public CRO: string,
        public StartDate?: Date,
        public DueDate?: Date        
    ) { }     
}
