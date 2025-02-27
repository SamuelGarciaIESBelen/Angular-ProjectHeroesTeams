import { Component, inject } from '@angular/core';
import { TeamService } from '../../../service/team.service';
import { HeroService } from '../../../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../../model/Team';
import { Hero } from '../../../model/Hero';
import { Map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-details-team',
  imports: [],
  templateUrl: './details-team.component.html'
})
export class DetailsTeamComponent {

  private teamService: TeamService = inject(TeamService);
  private heroService: HeroService = inject(HeroService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id: string;
  team: Team | undefined;
  listaHeroes: Hero[] = [];
  
  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!;

    this.teamService.getTeam(this.id).subscribe(t => this.team = t);
    this.heroService.getAllHeroes().subscribe(h => {
      this.listaHeroes = h.filter(h => h.team === this.id);
    });
  }
}
