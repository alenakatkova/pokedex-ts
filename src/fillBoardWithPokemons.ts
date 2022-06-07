import {Pokemon} from "./interfaces/PokemonList";
import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";

const CARD_TEMPLATE = <HTMLTemplateElement>document.getElementById("card");

function createCardTemplate(pokemon: PokemonDetails, template: HTMLTemplateElement) : HTMLElement {
    const clone = <HTMLElement>template.content.cloneNode(true);
    const nameContainer = clone.querySelector(".name");
    const picture = clone.querySelector(".picture");
    picture.setAttribute("src", pokemon.sprites.front_default)
    nameContainer.textContent = pokemon.name;
    return clone;
}

export default function fillBoardWithPokemons(pokemons: Pokemon[]) {
    const promises = pokemons.map(pokemon => {
        return getPokemonDetails(pokemon.name)
    })
    Promise
        .allSettled(promises)
        .then(result => {
            const fulfilledResults = result.filter(pok => pok.status === "fulfilled") as PromiseFulfilledResult<PokemonDetails>[]
            return fulfilledResults.map(fulfilledResult => fulfilledResult.value)
        })
        .then(cards => {
            const board = <HTMLElement>document.createElement("div");
            board.setAttribute("class", "board");
            for (let card of cards) {
                board.appendChild(createCardTemplate(card, CARD_TEMPLATE));
            }
            return board;
        })
        .then(board => {
            const container = document.getElementById("content-container");
            container.appendChild(board)
        })
};