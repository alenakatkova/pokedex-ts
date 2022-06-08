import getPokemons from "./api/getPokemons";
import {fillBoardWithPokemons, fillBoardWithPokemonsWithTimeout} from "./fillBoardWithPokemons";
import {addPageBtnsListeners, removePageBtnsListeners, updateBtnsAvailability} from "./pagination";
import {Pokemon, PokemonList} from "./interfaces/PokemonList";

function retrieveInitialPokemonList(): Promise<PokemonList> {
    return getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10", 10);
}

async function run() {
    window.POKEMON_LIST = await retrieveInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    fillBoardWithPokemons(window.POKEMON_LIST.results);
    updateBtnsAvailability(window.PREV_LIST_URL, window.NEXT_LIST_URL);
    addPageBtnsListeners();
}

async function runWithTimout() {
    console.log("running with timeout")
    window.POKEMON_LIST = await retrieveInitialPokemonList();
    window.PREV_LIST_URL = window.POKEMON_LIST.previous;
    window.NEXT_LIST_URL = window.POKEMON_LIST.next;
    fillBoardWithPokemonsWithTimeout(window.POKEMON_LIST.results);
    updateBtnsAvailability(window.PREV_LIST_URL, window.NEXT_LIST_URL);
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
            console.log("withTimeout");
            runWithTimout();
        }
    }, false);
}


