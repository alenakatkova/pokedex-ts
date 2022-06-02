import axios from "axios";
import { PokemonList } from "../interfaces/PokemonList";

export default async (url: string) : Promise<PokemonList> => {
    try {
        const { data } = await axios
            .get<PokemonList>(url);
        return data;
    } catch (error) {
        console.log(error);
    }
}