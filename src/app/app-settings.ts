export const IsAppLive: boolean = false;

export class AppSettings {
    public static get API_VIDEO(): string {
        return IsAppLive ? "web/api/video" : "http://localhost:8000/api/video";       
    }
    public static get API_LANG(): string {
        return IsAppLive ? "web/api/lang" : "http://localhost:8000/api/lang";
    }
    public static get API_STUDY(): string {
        return IsAppLive ? "web/api/study" : "http://localhost:8000/api/study";
    }

}
