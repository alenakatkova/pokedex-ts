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

export function fillBoardWithPokemons(pokemons: Pokemon[]) {
    const promises = pokemons.map(pokemon => {
        return getPokemonDetails(pokemon.name)
    })
    Promise
        .all(promises)
        .then(pokemons => {
            return pokemons.map(pokemon => {
                return createCardTemplate(pokemon, CARD_TEMPLATE)
            })
        })
        .then(cards => {
            const board = <HTMLElement>document.createElement("div")
            for (let card of cards) {
                board.appendChild(card)
            }
            return board;
        })
        .then(board => {
            const container = document.getElementById("container");
            container.appendChild(board)
        })
}