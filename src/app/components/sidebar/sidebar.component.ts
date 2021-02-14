import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../api/services/pokemon.service";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeWhile,
  tap
} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {interval} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  searchPokemon: FormControl
  next

  pokemonList
  filteredPokemonList

  constructor(private pokemonService: PokemonService) {
    this.searchPokemon = new FormControl('');

    this.searchPokemon.valueChanges.pipe(
      debounceTime(400), distinctUntilChanged(),
    ).subscribe(term => {
      if (term) {
        this.searchData(this.searchPokemon.value, this.next);
      } else {
        this.filteredPokemonList = ''
      }
    });

    this.pokemonService.getPokemonList().pipe(
      map(res => {
        res.results.map((e,i) => {
          res.results[i].url = e.url.replace(this.pokemonService.baseUrl, '')
        })
        return res
      }),
      map(res => {
        res.results.map((e,i) => {
          res.results[i].name = this.pokemonService.genderReplacer(e.name)
        })
        return res
      }),
      ).subscribe(res => {
        this.next = res.next
        this.pokemonList = res.results
    })
  }

  ngOnInit(): void {
  }

  searchData(searchPokemon, searchNext){
    searchPokemon = searchPokemon.trim()
    this.filteredPokemonList = this.pokemonList.filter(e => e.name.includes(searchPokemon))
    interval(300).pipe(
      tap(res => {
        if (searchNext && searchPokemon) {
          this.pokemonService.get(searchNext).subscribe(res => {
            const filtered = res.results.filter(e => e.name.includes(searchPokemon))
            searchNext = res.next
            if (filtered.length) {
              filtered.map((e,i) => {
                filtered[i].url = e.url.replace(this.pokemonService.baseUrl, '')
              })
              this.filteredPokemonList.push(...filtered)
            }
          })
        }
      }),
      takeWhile(x => searchNext && this.searchPokemon.value != '' && searchPokemon === this.searchPokemon.value)
    ).subscribe()
  }

  loadMore(){
    this.pokemonService.get(this.next).pipe(
      map(res => {
        res.results.map((e,i) => {
          res.results[i].url = e.url.replace(this.pokemonService.baseUrl, '')
        })
        return res
      }),
    ).subscribe(res => {
      this.next = res.next
      this.pokemonList.push(...res.results)
    })
  }
}
