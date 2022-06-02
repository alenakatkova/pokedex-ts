import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";
import getSetAmountOfPokemons from "./api/getSetAmountOfPokemons";

const pokemon : PokemonDetails = await getPokemonDetails("pikachu")
const pokemons = await getSetAmountOfPokemons(10)

console.log(pokemons)

