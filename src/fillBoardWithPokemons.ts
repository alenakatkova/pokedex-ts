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

export function fillBoardWithPokemonsWithTimeout(pokemons: Pokemon[]) {
    const board = <HTMLElement>document.createElement("div");
    board.setAttribute("class", "board");
    const container = document.getElementById("content-container");
    container.appendChild(board);
    for(let i = 0; i < pokemons.length; i++) {
        delay(i, pokemons[i])
    }

    function delay(i: number, pokemon: Pokemon) {
        setTimeout(() => {
            Promise
                .resolve(getPokemonDetails(pokemon.name))
                .then(res => {
                    board.appendChild(createCardTemplate(res, CARD_TEMPLATE));
                })
        }, i * 1000);
    }
}

export function fillBoardWithPokemons(pokemons: Pokemon[]) {
    const promises = pokemons.map(pokemon => {
        return getPokemonDetails(pokemon.name)
    });
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