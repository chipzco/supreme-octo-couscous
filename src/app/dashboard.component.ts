import { Component, OnInit } from '@angular/core';
import { Hero } from './heroes/hero';
import { HeroService } from './heroes/hero.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
  
})
export class DashboardComponent { 
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes.slice(1, 5), ((e: Error) => { console.log('Something wrong'); console.log(e);
  },() => console.log("Complete get Heroes")));
  }
}