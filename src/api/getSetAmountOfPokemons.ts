import axios from "axios";

export default async (amount: number) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`);
        return data;
    } catch (error) {
        console.log(error);
    }
}