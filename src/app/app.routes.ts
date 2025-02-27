import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ListHeroComponent } from './component/hero/list-hero/list-hero.component';
import { CreateHeroComponent } from './component/hero/create-hero/create-hero.component';
import { EditHeroComponent } from './component/hero/edit-hero/edit-hero.component';
import { DetailsHeroComponent } from './component/hero/details-hero/details-hero.component';
import { ListTeamComponent } from './component/team/list-team/list-team.component';
import { CreateTeamComponent } from './component/team/create-team/create-team.component';
import { EditTeamComponent } from './component/team/edit-team/edit-team.component';
import { DetailsTeamComponent } from './component/team/details-team/details-team.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "heroes", component: ListHeroComponent },
    { path: "create-hero", component: CreateHeroComponent },
    { path: "edit-hero/:id", component: EditHeroComponent },
    { path: "details-hero/:id", component: DetailsHeroComponent },
    { path: "teams", component: ListTeamComponent },
    { path: "create-team", component: CreateTeamComponent },
    { path: "edit-team/:id", component: EditTeamComponent },
    { path: "details-team/:id", component: DetailsTeamComponent },
];
