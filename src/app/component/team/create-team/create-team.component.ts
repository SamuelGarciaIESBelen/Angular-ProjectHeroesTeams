import { Component, inject } from '@angular/core';
import { TeamService } from '../../../service/team.service';
import { HeroService } from '../../../service/hero.service';
import { Team } from '../../../model/Team';
import { Hero } from '../../../model/Hero';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-team.component.html'
})
export class CreateTeamComponent {

  private teamService: TeamService = inject(TeamService);
  private heroService: HeroService = inject(HeroService);
  private router: Router = inject(Router);

  listaTeams: Team[] = [];
  listaHeroes: Hero[] = [];

  constructor() {
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
    this.heroService.getAllHeroes().subscribe(h => {
      this.listaHeroes = h.filter(h => !h.team);
    });
  }

  createTeamForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "leader": new FormControl("", Validators.required),
    "lat": new FormControl("", Validators.required),
    "lon": new FormControl("", Validators.required),
  });

  crearEquipo() {
    if (this.createTeamForm.valid) {
      const nuevoEquipo: Team = {
        id: (Number.parseInt(this.listaTeams[this.listaTeams.length - 1].id) + 1).toString(),
        name: this.createTeamForm.value.name!,
        leader: this.createTeamForm.value.leader!,
        location: {
          lat: Number.parseFloat(this.createTeamForm.value.lat!),
          lon: Number.parseFloat(this.createTeamForm.value.lon!),
        }
      }
      this.teamService.addTeam(nuevoEquipo).subscribe(() => this.listaTeams.push(nuevoEquipo));
      
      // Añadir equipo en el líder
      this.heroService.getHero(this.createTeamForm.value.leader!).subscribe(h => {
        const nuevoHeroe = h;
        nuevoHeroe.team = nuevoEquipo.id;
        this.heroService.updateHero(nuevoHeroe).subscribe();
      })

      this.createTeamForm.reset();
      this.router.navigate(['/teams']);
    }
  }
}
