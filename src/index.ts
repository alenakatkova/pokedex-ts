import add from "./add";
import axios from "axios";

let a: number = 12;

console.log(add(a, 99));

interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface PokemonDetails {
    abilities: Array<Ability>
    name: string;
    height: number;
}

const getPokemonDetails = async (pokemonName: string) : Promise<PokemonDetails>=> {
    try {
        const { data, status } = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
        console.log(JSON.stringify(data))
        console.log('response status is: ', status);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const l = await getPokemonDetails("nice")

console.log(l)

