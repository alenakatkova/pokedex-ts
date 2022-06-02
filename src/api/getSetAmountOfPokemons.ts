import axios from "axios";
import PokemonList from "../interfaces/Pokemons";

export default async (amount: number, offset: number) : Promise<PokemonList> => {
    try {
        const { data } = await axios
            .get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offset}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}