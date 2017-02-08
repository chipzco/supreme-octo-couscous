export class Study {
    constructor(
        public id: number,
        public protocol: string,
        public cRO: string,
        public startDate?: Date,
        public dueDate?: Date
    ) {    }          
}

