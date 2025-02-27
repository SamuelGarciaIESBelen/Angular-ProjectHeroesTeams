import { Component, inject } from '@angular/core';
import { TeamService } from '../../../service/team.service';
import { HeroService } from '../../../service/hero.service';
import { Team } from '../../../model/Team';
import { Hero } from '../../../model/Hero';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-team.component.html'
})
export class EditTeamComponent {

  private teamService: TeamService = inject(TeamService);
  private heroService: HeroService = inject(HeroService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  listaTeams: Team[] = [];
  listaHeroes: Hero[] = [];
  teamId: string;

  editTeamForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "leader": new FormControl("", Validators.required),
    "lat": new FormControl("", Validators.required),
    "lon": new FormControl("", Validators.required),
  });

  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.teamId = routeParams.get('id')!;
    
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
    this.heroService.getAllHeroes().subscribe(h => {
      this.listaHeroes = h.filter(h => !h.team || h.team === this.teamId);
    });

    this.teamService.getTeam(this.teamId).subscribe(t => {
      this.editTeamForm.patchValue({
        "name": t.name,
        "leader": t.leader,
        "lat": t.location.lat.toString(),
        "lon": t.location.lon.toString(),
      })
    })
  }

  editarEquipo() {
    if (this.editTeamForm.valid) {
      const nuevoEquipo: Team = {
        id: this.teamId,
        name: this.editTeamForm.value.name!,
        leader: this.editTeamForm.value.leader!,
        location: {
          lat: Number.parseFloat(this.editTeamForm.value.lat!),
          lon: Number.parseFloat(this.editTeamForm.value.lon!),
        }
      }
      this.teamService.updateTeam(nuevoEquipo).subscribe();
      this.router.navigate(['/teams']);
    }
  }
}
