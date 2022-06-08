import {Pokemon} from "../interfaces/PokemonList";
import {appendBoard, CARD_TEMPLATE, createBoard, createCardTemplate, getArrayOfPokemonDetails} from "./common";
import PokemonDetails from "../interfaces/PokemonDetails";

function delayPokemonInsertion(pokemonDetails: PokemonDetails, board: HTMLElement, delayInSeconds: number) {
    setTimeout(() => {
        board.appendChild(createCardTemplate(pokemonDetails, CARD_TEMPLATE));
    }, delayInSeconds * 1000);
}

export function renderCardsSequentiallyWithTimeout(pokemons: Pokemon[]) {
    const board = createBoard();
    appendBoard(board);
    getArrayOfPokemonDetails(pokemons)
        .then(cards => {
            for (let i = 0; i < cards.length; i++) {
                delayPokemonInsertion(cards[i], board, i)
            }
        })
}