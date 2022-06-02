import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";

const pokemon : PokemonDetails = await getPokemonDetails("pikachu")

console.log(pokemon)

