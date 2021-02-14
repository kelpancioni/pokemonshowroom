import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { PokemonList } from '../models/pokemonlist'
import {Observable} from "rxjs";
import {PokemonDetails} from "../models/pokemonDetails";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor( private http: HttpClient ) { }

  baseUrl = 'https://pokeapi.co/api/v2/';

  getPokemonList( offset = '', limit = '100'): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseUrl}pokemon`, {params: {limit, offset}})
  }

  getPokemonDetails(route): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}pokemon/${route}`)
  }

  genderReplacer(name) {
    if (name.includes('-f')) {
      return name.replace('-f', '♀')
    }
    if (name.includes('-m')) {
      return name.replace('-m', '♂')
    }
    return name
  }

  get(url): Observable<PokemonList>{
    return this.http.get<PokemonList>(url)
  }
}
