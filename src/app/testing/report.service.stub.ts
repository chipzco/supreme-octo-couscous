import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Video } from '../report/videos/video';
import { Study } from '../report/studies/study';
import { VideoStudy } from '../report/video-study/video-study';
import { Language } from '../report/videos/video';
import { patact } from '../report/videos/video';

export class reportServiceStub {
	getVideoStudy(id: number): Observable<VideoStudy> {
		let vs=new VideoStudy(id);
        return Observable.of(vs);        
    }
    postVideoStudy(videostudy: VideoStudy): Observable<any> {
        return Observable.of(videostudy);        
    }
    getVideoStudies(vid = 0): Observable<VideoStudy[]> {
		let vs=new Array<VideoStudy>();
		vs.push(new VideoStudy(1));
		vs.push(new VideoStudy(2));        
        return Observable.of(vs);
    }	
	
	
	getVideosCached(): Video[] {
		let videos=[new Video(1, "X1", "", patact.unassigned, 0, new Language(), []),new Video(2, "X2", "", patact.unassigned, 0, new Language(), [])]
		return videos;
	} 
	getVideos(): Observable<Video[]> {
		return Observable.of(this.getVideosCached());	
	}
	
	
    deleteVideoStudy(id: number): Observable<any> {        
        return Observable.of(id);
    }

	getStudies() {
		let studies=this.getStudiesCached();		
		return Observable.of(studies);
	}
	getStudiesCached(): Study[] {
		let studies=new Array<Study>();
		studies.push(new Study(1,'12','3cro--1'));
		studies.push(new Study(2,'14','4cro--1'));
		return studies;
	}

	
	
	getVideo(id: number) {
		return Observable.of(new Video(id, "X", "", patact.unassigned, 0, new Language(), []));	
	}
}