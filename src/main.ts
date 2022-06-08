import getPokemons from "./api/getPokemons";
import {addPageBtnsListeners, removePageBtnsListeners, setBtnsAvailability} from "./pagination";
import {Pokemon, PokemonList} from "./interfaces/PokemonList";
import {renderCardsSequentiallyWithTimeout} from "./renderBoard/renderCardsSequentiallyWithTimeout";
import {renderCardsSimultaneously} from "./renderBoard/renderCardsSimultaneously";

function retrieveInitialPokemonList(): Promise<PokemonList> {
    return getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10", 10);
}

async function run() {
    window.POKEMON_LIST = await retrieveInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    renderCardsSimultaneously(window.POKEMON_LIST.results);
    setBtnsAvailability();
    addPageBtnsListeners();
}

async function runWithTimout() {
    window.POKEMON_LIST = await retrieveInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    renderCardsSequentiallyWithTimeout(window.POKEMON_LIST.results);
    setBtnsAvailability();
    addPageBtnsListeners();
}

export function handleModeChange() {
    const modeChoiceForm = <HTMLFormElement>document.getElementById("mode-choice-form");
    const container = document.getElementById("content-container");

    modeChoiceForm.addEventListener("submit", async function (e: Event) {
        e.preventDefault();
        container.innerHTML = "";
        removePageBtnsListeners();
        const formData = new FormData(modeChoiceForm);
        window.MODE = <string>formData.get("mode");
        if (window.MODE === "simultaneous") {
            await run();
        } else if (window.MODE === "withTimeout") {
            await runWithTimout();
        }
    }, false);
}
