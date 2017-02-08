import { Study } from './../studies/study';
import { Video } from './../videos/video';

export class VideoStudy {
    video: Video;
    study: Study;
    constructor(
        public id: number,
        public purpose?: string,
        public notes?: string,                        
    )  { }
}
