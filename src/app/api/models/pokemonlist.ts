export interface PokemonList {
  count: string
  next: string
  previous: string
  results: [{
    name: string,
    url: string
  }]
}
