import {Pokemon} from "../interfaces/PokemonList";
import getPokemonDetails from "../api/getPokemonDetails";
import PokemonDetails from "../interfaces/PokemonDetails";

export const CARD_TEMPLATE = <HTMLTemplateElement>document.getElementById("card");

export function createCardTemplate(pokemon: PokemonDetails, template: HTMLTemplateElement): HTMLElement {
    const clone = <HTMLElement>template.content.cloneNode(true);
    const nameContainer = clone.querySelector(".name");
    const picture = clone.querySelector(".picture");
    picture.setAttribute("src", pokemon.sprites.front_default)
    nameContainer.textContent = pokemon.name;
    return clone;
}

export function createBoard(): HTMLElement {
    const board = <HTMLElement>document.createElement("div");
    board.setAttribute("class", "board");
    return board;
}

export function appendBoard(board: HTMLElement) {
    const container = document.getElementById("content-container");
    container.appendChild(board);
}

function getPokemonsPromises(pokemons: Pokemon[]) {
    return pokemons.map(pokemon => {
        return getPokemonDetails(pokemon.name)
    });
}

export function getArrayOfPokemonDetails(nonDetailedPokemons: Pokemon[]): Promise<PokemonDetails[]> {
    const promises = getPokemonsPromises(nonDetailedPokemons);
    return Promise
        .allSettled(promises)
        .then(results => {
            const fulfilledResults = results
                .filter(result => result.status === "fulfilled") as PromiseFulfilledResult<PokemonDetails>[]
            return fulfilledResults.map(fulfilledResult => fulfilledResult.value)
        })
}