import axios from "axios";
import { PokemonList } from "../interfaces/PokemonList";

export default async (url: string, amount: number) : Promise<PokemonList> => {
    const urlWithoutLimit = url.split("&limit=")[0];

    try {
        const { data } = await axios
            .get<PokemonList>(urlWithoutLimit + "&limit=" + amount);
        return data;
    } catch (error) {
        console.log(error);
    }
}