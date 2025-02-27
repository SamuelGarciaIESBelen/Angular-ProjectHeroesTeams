import { Component, inject } from '@angular/core';
import { HeroService } from '../../../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../model/Hero';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../service/team.service';
import { Team } from '../../../model/Team';

@Component({
  selector: 'app-details-hero',
  imports: [CommonModule],
  templateUrl: './details-hero.component.html'
})
export class DetailsHeroComponent {

  private heroService: HeroService = inject(HeroService);
  private teamService: TeamService = inject(TeamService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id: string;
  hero: Hero | undefined;
  listaTeams: Team[] = [];
  
  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!;

    this.heroService.getHero(this.id).subscribe(h => this.hero = h);
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
  }
}
