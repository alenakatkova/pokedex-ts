import getPokemons from "./api/fetchPokemons";
import {addPageBtnsListeners, removePageBtnsListeners, setBtnsAvailability} from "./pagination";
import {Pokemon, PokemonList} from "./interfaces/PokemonList";
import {renderCardsSequentiallyWithTimeout} from "./renderBoard/renderCardsSequentiallyWithTimeout";
import {renderCardsSimultaneously} from "./renderBoard/renderCardsSimultaneously";

function fetchInitialPokemonList(): Promise<PokemonList> {
    return getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10", 10);
}

async function renderPokemonsWithoutTimeout() {
    window.POKEMON_LIST = await fetchInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    renderCardsSimultaneously(window.POKEMON_LIST.results);
    setBtnsAvailability();
    addPageBtnsListeners();
}

async function renderPokemonsWithTimeout() {
    window.POKEMON_LIST = await fetchInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    renderCardsSequentiallyWithTimeout(window.POKEMON_LIST.results);
    setBtnsAvailability();
    addPageBtnsListeners();
}

export function handleSubmit() {
    const container = document.getElementById("content-container");
    const modeChoiceForm = <HTMLFormElement>document.getElementById("mode-choice-form");

    modeChoiceForm.addEventListener("submit", async function (e: Event) {
        e.preventDefault();
        container.innerHTML = "";
        removePageBtnsListeners();
        const formData = new FormData(modeChoiceForm);
        window.MODE = <string>formData.get("mode");
        if (window.MODE === "simultaneous") {
            await renderPokemonsWithoutTimeout();
        } else if (window.MODE === "withTimeout") {
            await renderPokemonsWithTimeout();
        }
    }, false);
}
