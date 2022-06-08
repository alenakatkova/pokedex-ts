import getPokemons from "./api/getPokemons";
import fillBoardWithPokemons from "./fillBoardWithPokemons";
import {updateBtnsAvailability} from "./pagination";
import {PokemonList} from "./interfaces/PokemonList";

declare global {
    interface Window {
        MODE: string | null;
        POKEMON_LIST: PokemonList;
        PREV_LIST_URL: string | null;
        NEXT_LIST_URL: string | null;
    }
}

async function changePage(url: string) {
    const container = document.getElementById("content-container");
    const pokemonList = await getPokemons(url, 10);
    window.NEXT_LIST_URL = pokemonList.next;
    window.PREV_LIST_URL = pokemonList.previous;
    container.innerHTML = "";
    fillBoardWithPokemons(pokemonList.results);
    updateBtnsAvailability(window.PREV_LIST_URL, window.NEXT_LIST_URL);
}

async function handleNextBtnClick() {
    await changePage(window.NEXT_LIST_URL);
}

async function handlePrevBtnClick() {
    await changePage(window.PREV_LIST_URL);
}

function addPageBtnsListeners() {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    nextBtn.addEventListener("click", handleNextBtnClick);
    prevBtn.addEventListener("click", handlePrevBtnClick);
}

function removePageBtnsListeners() {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    nextBtn.removeEventListener("click", handleNextBtnClick);
    prevBtn.removeEventListener("click", handlePrevBtnClick);
}

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

export function handleModeChange() {
    const modeChoiceForm = <HTMLFormElement>document.getElementById("mode-choice-form");
    const container = document.getElementById("content-container");

    modeChoiceForm.addEventListener("submit", async function (e: Event) {
        e.preventDefault();
        container.innerHTML = "";
        removePageBtnsListeners();
        const formData = new FormData(modeChoiceForm);
        window.MODE = <string>formData.get("mode");
        console.log(window.MODE)
        if (window.MODE === "simultaneous") {
            await run();
        } else if (window.MODE === "withTimeout") {
            console.log("withTimeout");
        }
    }, false);
}


