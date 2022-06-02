import axios from "axios";
import PokemonDetails from "../interfaces/PokemonDetails";

export default async (pokemonName: string) : Promise<PokemonDetails>=> {
    try {
        const { data } = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}