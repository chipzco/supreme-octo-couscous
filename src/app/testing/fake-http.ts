import { AppSettings } from '../app-settings';
import { Video } from '../report/videos/video';
import { Study } from '../report/studies/study';
import { VideoStudy } from '../report/video-study/video-study';
import { Language } from '../report/videos/video';
import { patact } from '../report/videos/video';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class fakeHttp {
	
	private s_videos: Subject<Video[]>;
	
	constructor() {
		this.s_videos=new Subject<Video[]>();
	}

	
	

	get(url: string): Observable<Video[]> {
		if (url==AppSettings.API_VIDEO) {
			let s_video=new Video(0,'','',patact.unassigned,0,new Language('',0),[]);        
			this.s_videos.next([s_video]);
			return this.s_videos.asObservable();			
		}			
		else 		
			return null;
	}  

}