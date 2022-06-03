import axios from "axios";
import { PokemonList } from "../interfaces/PokemonList";

export default async (url: string, amount: number) : Promise<PokemonList> => {
    const urlWithoutLimit = url.split("&limit=")[0];

    try {
        const { data } = await axios
            .get<PokemonList>(urlWithoutLimit + "&limit=" + amount);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("axios error", error);
        } else {
            console.error("not an axios error", error);
        }
    }
}
//
// export default function getPokemons(url: string, amount: number) {
//     const urlWithoutLimit = url.split("&limit=")[0];
//     return new Promise<PokemonList>((resolve, reject) => {
//         return axios
//             .get<PokemonList>(urlWithoutLimit + "&limit=" + amount)
//             .then(response => {
//                 console.log(response)
//                 return response.data as PokemonList
//             })
//             .catch(error => {
//                 if (axios.isAxiosError(error)) {
//                     console.error("axios error", error);
//                 } else {
//                     console.error("not an axios error", error);
//                 }
//             });
//     })
// }