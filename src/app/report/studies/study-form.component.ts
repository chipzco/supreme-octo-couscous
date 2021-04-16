import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Study } from './study';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';
const stud_Saved_Text = "The study is being saved to the database. Please wait...";
const stud_FinSaved_Text = "Finished saving study in database repository";
const stud_SaveError_Text = "Error: unable to save study to database";
@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss']
})
export class StudyFormComponent implements OnInit {    
    study: Study;
    loadTexts: LoaderTexts;
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>(); //start stop fake loader
    constructor(private studyservice: ReportService, private route: ActivatedRoute) { }

   ngOnInit() {
       this.study = new Study(0,'',null,null);
       this.loadTexts = new LoaderTexts(stud_Saved_Text, stud_FinSaved_Text, stud_SaveError_Text);
       this.route.params.switchMap((params: Params) => +params['id'] ? this.studyservice.getStudy(+params['id']) : Observable.of<Study>(this.study))
           .subscribe(study => this.study = study);
    }
    get startStop(): Observable<LoaderStatus> {
       return this.starStop_s.asObservable();
   }

   submitted = false;
   onSubmit() {
       if (!this.submitted) {           
           this.submitted = true;
           this.starStop_s.next(LoaderStatus.Start); //start 
           let objsPosted = this.studyservice.postStudy(this.study);
           objsPosted.subscribe(data => this.finishPosting(data), ERR => this.errorPosting(ERR));
           //objsPosted.catch(err => this.errorPosting(err)).subscribe(a => console.log(a));           
       }
   }
   private finishPosting(data: any): void {
       // console.log(data);
       this.study = data;
       this.starStop_s.next(LoaderStatus.Stop);
       //this.progress = 100;
   }
   private errorPosting(err: any): void  {      
       this.starStop_s.next(LoaderStatus.Error); 
       console.log("An Error Happened: " + err);       
       //console.log(err);
   }
     
   convToJsonDate(d: Date): string {
       return JSON.stringify(d);
   }
}
