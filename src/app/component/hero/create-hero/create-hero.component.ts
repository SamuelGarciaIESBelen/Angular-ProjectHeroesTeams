import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HeroService } from '../../../service/hero.service';
import { TeamService } from '../../../service/team.service';
import { Hero } from '../../../model/Hero';
import { Team } from '../../../model/Team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hero',
  imports: [ReactiveFormsModule],
  templateUrl: './create-hero.component.html'
})
export class CreateHeroComponent {

  private heroService: HeroService = inject(HeroService);
  private teamService: TeamService = inject(TeamService);
  private router: Router = inject(Router);

  listaHeroes: Hero[] = [];
  listaTeams: Team[] = [];

  constructor() {
    this.heroService.getAllHeroes().subscribe(h => this.listaHeroes = h);
    this.teamService.getAllTeams().subscribe(t => this.listaTeams = t);
  }

  createHeroForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "secretId": new FormControl("", Validators.required),
    "gender": new FormControl("", Validators.required),
    "height": new FormControl("", [Validators.required, Validators.min(1)]),
    "powers": new FormControl(),
    "team": new FormControl(""),
  });

  crearHeroe() {
    if (this.createHeroForm.valid) {
      const nuevoHeroe: Hero = {
        id: (Number.parseInt(this.listaHeroes[this.listaHeroes.length - 1].id) + 1).toString(),
        name: this.createHeroForm.value.name!,
        secretId: this.createHeroForm.value.secretId!,
        gender: this.createHeroForm.value.gender!,
        height: Number.parseInt(this.createHeroForm.value.height!),
        powers: this.createHeroForm.value.powers ?? false,
        team: this.createHeroForm.value.team!
      }
      this.heroService.addHero(nuevoHeroe).subscribe(() => this.listaHeroes.push(nuevoHeroe));
      this.createHeroForm.reset();
      this.router.navigate(['/heroes']);
    }
  }
}
