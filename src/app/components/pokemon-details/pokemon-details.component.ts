import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../../api/services/pokemon.service";
import {map, tap} from "rxjs/operators";
import {PokemonDetails} from "../../api/models/pokemonDetails";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  urlRoute
  pokemonDetails: PokemonDetails

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) {
    this.route.params.subscribe(res => {
      this.urlRoute = res.pokemonId
      this.pokemonService.getPokemonDetails(this.urlRoute).pipe(
        map(res => {
          res.name = this.pokemonService.genderReplacer(res.name)
          res.abilities.map((e,i) => {
            res.abilities[i].ability.name = e.ability.name.replace('-',' ')
          })
          return res
        }),
      ).subscribe(res => this.pokemonDetails = res)
    })
  }

  ngOnInit(): void {
  }
}
