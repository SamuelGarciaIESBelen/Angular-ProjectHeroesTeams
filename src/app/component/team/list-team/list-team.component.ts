import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TeamService } from '../../../service/team.service';
import { HeroService } from '../../../service/hero.service';
import { Team } from '../../../model/Team';
import { Hero } from '../../../model/Hero';

@Component({
  selector: 'app-list-hero',
  imports: [RouterLink],
  templateUrl: './list-team.component.html'
})
export class ListTeamComponent {

  private teamService: TeamService = inject(TeamService);
  private heroService: HeroService = inject(HeroService);

  listaTeams: Team[] = [];
  listaHeroes: Hero[] = [];

  constructor() {
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
    this.heroService.getAllHeroes().subscribe(h => this.listaHeroes = h);
  }

  eliminarEquipo(id: string) {
    if (this.listaHeroes.find(h => h.team === id)) {
      alert("No es posible eliminar un equipo con superhéroes asignados")
    }
    else if (confirm("¿Estás seguro de que deseas eliminarlo?")) {
      this.teamService.deleteTeam(id).subscribe(() => this.teamService.getAllTeams().subscribe(t => this.listaTeams = t));
    }
  }
}