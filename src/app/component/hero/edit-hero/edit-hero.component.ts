import { Component, inject } from '@angular/core';
import { Team } from '../../../model/Team';
import { Hero } from '../../../model/Hero';
import { TeamService } from '../../../service/team.service';
import { HeroService } from '../../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'app-edit-hero',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-hero.component.html'
})
export class EditHeroComponent {

  private heroService: HeroService = inject(HeroService);
  private teamService: TeamService = inject(TeamService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  listaHeroes: Hero[] = [];
  listaTeams: Team[] = [];
  heroId: string;

  editHeroForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "secretId": new FormControl("", Validators.required),
    "gender": new FormControl("", Validators.required),
    "height": new FormControl("", [Validators.required, Validators.min(1)]),
    "powers": new FormControl(),
    "team": new FormControl(""),
  })

  constructor() {
    this.heroService.getAllHeroes().subscribe(h => this.listaHeroes = h);
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);

    const routeParams = this.route.snapshot.paramMap;
    this.heroId = routeParams.get('id')!;

    this.heroService.getHero(this.heroId).subscribe(h => {
      this.editHeroForm.patchValue({
        "name": h.name,
        "secretId": h.secretId,
        "gender": h.gender,
        "height": h.height.toString(),
        "powers": h.powers,
        "team": h.team,
      })
    })
  }

  editarHeroe() {
    if (this.editHeroForm.valid) {
      const nuevoHeroe: Hero = {
        id: this.heroId,
        name: this.editHeroForm.value.name!,
        secretId: this.editHeroForm.value.secretId!,
        gender: this.editHeroForm.value.gender!,
        height: Number.parseInt(this.editHeroForm.value.height!),
        powers: this.editHeroForm.value.powers ?? false,
        team: this.editHeroForm.value.team!
      }

      // Eliminar líder del equipo solo si cambia el equipo al editar, no es muy eficiente
      this.heroService.getHero(this.heroId).subscribe(h => {
        if (h.team !== nuevoHeroe.team) {
          this.teamService.getTeam(h.team).subscribe(t => {
            const team = t;
            team.leader = "";
            this.teamService.updateTeam(team).subscribe();
          });
        }
      });

      this.heroService.updateHero(nuevoHeroe).subscribe();
      this.router.navigate(['/heroes']);
    }
  }
}
