import { Component, inject } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { TeamService } from '../../service/team.service';
import { Hero } from '../../model/Hero';
import { Team } from '../../model/Team';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private heroService: HeroService = inject(HeroService);
  private teamService: TeamService = inject(TeamService);

  heroes = 0;
  teams = 0;

  constructor() { }

  ngOnInit() {
    this.heroService.getAllHeroes().subscribe((heroes: Hero[]) => { this.heroes = heroes.length; });
    this.teamService.getAllTeams().subscribe((teams: Team[]) => { this.teams = teams.length; });
  }
}
