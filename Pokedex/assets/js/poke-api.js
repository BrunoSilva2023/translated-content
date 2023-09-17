
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.weight = pokeDetail.weight

    const stats = pokeDetail.stats;
    stats.forEach((stat) => {
        switch (stat.stat.name) {
            case "hp":
                pokemon.hp = stat.base_stat;
                break;
            case "defense":
                pokemon.defense = stat.base_stat;
                break;
            case "special-attack":
                pokemon.specialAttack = stat.base_stat;
                break;
            case "special-defense":
                pokemon.specialDefense = stat.base_stat;
                break;
            case "speed":
                pokemon.speed = stat.base_stat;
                break;
            default:
                break;
        }
    });
    
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type



    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default



    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
