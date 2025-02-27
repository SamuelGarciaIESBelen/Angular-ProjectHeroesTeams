import { Injectable } from '@angular/core';
import { Team } from '../model/Team';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = 'http://localhost:3001/teams';

  constructor(private http: HttpClient) { }

  getAllTeams() { return this.http.get<Team[]>(this.url); }

  getTeam(id: string) { return this.http.get<Team>(`${this.url}/${id}`); }

  addTeam(Team: Team) { return this.http.post<Team>(this.url, Team); }

  updateTeam(Team: Team) { return this.http.put<Team>(`${this.url}/${Team.id}`, Team); }

  deleteTeam(id: string) { return this.http.delete(`${this.url}/${id}`); }
}