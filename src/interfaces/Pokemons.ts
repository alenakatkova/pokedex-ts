interface Pokemon {
    name: string;
    url: string;
}

export default interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Pokemon>
}