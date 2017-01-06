export  enum patact {
    unassigned,
    patient,
    actor,
    unknown
}
export class Language {
    public lname: string;
    public id: number;
}
export class Video {
    constructor(
        public id: number,
        public filename: string,
        public subjectname: string,
        public patientact: patact,
        public videoid: number,
        public language: Language,        
        public transcripts: Language[] 
    ) { }
     
}
