import {Pokemon} from "../interfaces/PokemonList";
import fetchPokemonDetails from "../api/getPokemonDetails";
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

export function getDetailedPokemons(nonDetailedPokemons: Pokemon[]): Promise<PokemonDetails[]> {
    const detailedPokemons : Promise<PokemonDetails>[] = nonDetailedPokemons.map(pokemon => {
        return fetchPokemonDetails(pokemon.name)
    });
    return Promise
        .allSettled(detailedPokemons)
        .then(results => {
            const fulfilledResults = results
                .filter(result => result.status === "fulfilled") as PromiseFulfilledResult<PokemonDetails>[];
            return fulfilledResults.map(fulfilledResult => fulfilledResult.value)
        })
}