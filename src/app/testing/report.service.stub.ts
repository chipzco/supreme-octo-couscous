import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Video } from '../report/videos/video';
import { Study } from '../report/studies/study';
import { VideoStudy } from '../report/video-study/video-study';
import { Language } from '../report/videos/video';
import { patact } from '../report/videos/video';

export class reportServiceStub {
	getVideoStudy(id: number): Observable<VideoStudy> {
		let vs=new VideoStudy(1);
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
    deleteVideoStudy(id: number): Observable<any> {        
        return Observable.of(id);
    }

	

}