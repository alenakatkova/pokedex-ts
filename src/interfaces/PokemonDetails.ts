interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface Sprites {
    back_default?: string;
    front_default?: string;
}

export default interface PokemonDetails {
    abilities: Array<Ability>
    name: string;
    height: number;
    weight: number;
    sprites: Sprites;
}