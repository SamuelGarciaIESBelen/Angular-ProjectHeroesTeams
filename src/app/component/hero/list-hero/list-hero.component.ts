import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../../../service/hero.service';
import { TeamService } from '../../../service/team.service';
import { Hero } from '../../../model/Hero';
import { Team } from '../../../model/Team';

@Component({
  selector: 'app-list-hero',
  imports: [RouterLink, FormsModule],
  templateUrl: './list-hero.component.html'
})
export class ListHeroComponent {

  private heroService: HeroService = inject(HeroService);
  private teamService: TeamService = inject(TeamService);

  listaHeroes: Hero[] = [];
  listaTeams: Team[] = [];
  selectedTeamId: string = "";

  constructor() {
    this.heroService.getAllHeroes().subscribe(h => this.listaHeroes = h);
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
  }

  // Otra alternativa para filtrar sin usar un observable, es más cómodo y rápido pero no lo hemos visto en clase 
  get listaHeroesFiltrada(): Hero[] {
    return this.selectedTeamId
      ? this.listaHeroes.filter(h => h.team === this.selectedTeamId)
      : this.listaHeroes;
  }

  eliminarHeroe(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminarlo?")) {
      // Eliminar líder del equipo
      this.heroService.getHero(id).subscribe(h => {
        this.teamService.getTeam(h.team).subscribe(t => {
          const team = t;
          team.leader = "";
          this.teamService.updateTeam(team).subscribe();
        });
      });
      
      this.heroService.deleteHero(id).subscribe(() => this.heroService.getAllHeroes().subscribe(h => this.listaHeroes = h));
    }
  }
}