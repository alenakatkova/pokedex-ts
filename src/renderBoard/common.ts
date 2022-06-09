import {Pokemon} from "../interfaces/PokemonList";
import fetchPokemonDetails from "../api/fetchPokemonDetails";
import PokemonDetails from "../interfaces/PokemonDetails";

export const CARD_TEMPLATE = <HTMLTemplateElement>document.getElementById("card");

export function createCardTemplate(pokemon: PokemonDetails, template: HTMLTemplateElement): HTMLElement {
    const clone = <HTMLElement>template.content.cloneNode(true);

    // add name to card
    const nameContainer = clone.querySelector(".name");
    nameContainer.textContent = pokemon.name;

    // add picture to card
    const picture = clone.querySelector(".picture");
    picture.setAttribute("src", pokemon.sprites.front_default);
    picture.addEventListener("mouseover", () => {
        picture.setAttribute("src", pokemon.sprites.back_default);
    });
    picture.addEventListener("mouseleave", () => {
        picture.setAttribute("src", pokemon.sprites.front_default);
    });

    // add abilities to card
    const abilitiesList = clone.querySelector(".abilities-list");
    pokemon.abilities.map(ability => {
        const abilityItem = <HTMLElement>document.createElement("li");
        const abilityName = ability.ability.name.split("-").join(" ");
        abilityItem.setAttribute("class", "ability-name");
        abilityItem.textContent = abilityName;
        abilitiesList.appendChild(abilityItem);
    });

    // add height and weight to card
    const height = clone.querySelector(".height");
    const weight = clone.querySelector(".weight");
    height.textContent = <string><unknown>pokemon.height;
    weight.textContent = <string><unknown>pokemon.weight;

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