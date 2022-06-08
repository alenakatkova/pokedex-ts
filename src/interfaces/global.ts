import {PokemonList} from "./PokemonList";

declare global {
    interface Window {
        MODE: string | null; // TODO enum?
        POKEMON_LIST: PokemonList;
        PREV_LIST_URL: string | null;
        NEXT_LIST_URL: string | null;
    }
}

export {};
