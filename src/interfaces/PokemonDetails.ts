interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

export default interface PokemonDetails {
    abilities: Array<Ability>
    name: string;
    height: number;
}