import { Injectable } from '@angular/core';
import { Hero } from '../model/Hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) { }

  getAllHeroes() { return this.http.get<Hero[]>(this.url); }

  getHero(id: string) { return this.http.get<Hero>(`${this.url}/${id}`); }

  addHero(Hero: Hero) { return this.http.post<Hero>(this.url, Hero); }

  updateHero(Hero: Hero) { return this.http.put<Hero>(`${this.url}/${Hero.id}`, Hero); }

  deleteHero(id: string) { return this.http.delete(`${this.url}/${id}`); }
}