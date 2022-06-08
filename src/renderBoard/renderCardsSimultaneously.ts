import {Pokemon} from "../interfaces/PokemonList";
import {appendBoard, CARD_TEMPLATE, createBoard, createCardTemplate, getArrayOfPokemonDetails} from "./common";

export function renderCardsSimultaneously(pokemons: Pokemon[]) {
    getArrayOfPokemonDetails(pokemons)
        .then(cards => {
            const board = createBoard();
            for (let card of cards) {
                board.appendChild(createCardTemplate(card, CARD_TEMPLATE));
            }
            return board;
        })
        .then(board => {
            appendBoard(board);
        })
}