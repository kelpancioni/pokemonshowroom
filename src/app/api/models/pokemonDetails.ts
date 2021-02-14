export interface PokemonDetails {
  id: number,
  name: string,
  sprites: {
    front_default: string,
    other: {
      official_artwork:{
        'official-artwork':string
      }
    }
  },
  abilities: [{
    ability: {
      name:string
    }
  }],
  types: [{
    type: {
      name: string
    }
  }]
}
