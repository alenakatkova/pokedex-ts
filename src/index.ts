import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";
import getSetAmountOfPokemons from "./api/getSetAmountOfPokemons";
import PokemonList from "./interfaces/Pokemons";

const pokemon : PokemonDetails = await getPokemonDetails("pikachu")
const pokemons : PokemonList = await getSetAmountOfPokemons(10, 0)

console.log(pokemons)

