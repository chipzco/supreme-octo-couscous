import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Hero } from './hero';



@Injectable()
export class HeroService {
    private heroesUrl = 'http://local.hero.web/api/heroesef';  // URL to web api
	//private heroesUrl='app/heroes';
    private headers = new Headers({ 'Content-Type': 'application/json', "Accept": "application/json" });
	
	 

    constructor(private http: Http) { }
	/*
	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
	}
	*/
	
	getHeroes(): Observable<Hero[]> {
		return this.http.get(this.heroesUrl)               
				.map(response => response.json() as Hero[])
               .catch(this.handleError);
	}
	

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}     
     
    
	
	

    
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`; 
		return this.http.get(url)		
		.map(response => response.json() as Hero)
		.catch(this.handleError);
	}

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        console.log(url);
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(hero: Hero): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


}