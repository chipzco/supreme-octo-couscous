
import {
    Component, OnInit, HostBinding, trigger, transition, animate,
    style, state  } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id.toString(),	
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  animations: [
      trigger('routeAnimation', [
          state('*',
              style({
                  opacity: 1,
                  transform: 'translateX(0)'
              })
          ),
          transition(':enter', [
              style({
                  opacity: 0,
                  transform: 'translateX(-100%)'
              }),
              animate('0.2s ease-in')
          ]),
          transition(':leave', [
              animate('0.5s ease-out', style({
                  opacity: 0,
                  transform: 'translateY(100%)'
              }))
          ])
      ])
  ]
})
export class HeroDetailComponent implements  OnInit {
    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

	hero: Hero;
	
	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}	
	
	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.heroService.getHero(+params['id']))
		.subscribe(hero => this.hero = hero);
	}

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
   goBack(): void {
	this.location.back();
   }

	gotoHeroes() {
	  let heroId = this.hero ? this.hero.id : null;
	  // Pass along the hero id if available
	  // so that the HeroList component can select that hero.
	  this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
	}
   
}