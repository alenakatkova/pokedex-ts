import getPokemons from "./api/fetchPokemons";
import {renderCardsSequentiallyWithTimeout} from "./renderBoard/renderCardsSequentiallyWithTimeout";
import {renderCardsSimultaneously} from "./renderBoard/renderCardsSimultaneously";

const PREVIOUS_BTN = document.getElementById("page-button-previous");
const NEXT_BTN = document.getElementById("page-button-next");

function toggleBtnDisableAttribute(btn: HTMLElement, shouldBeDisabled: boolean) {
    if (shouldBeDisabled) {
        btn.setAttribute("disabled", "");
    } else {
        btn.removeAttribute("disabled");
    }
}

export function setBtnsAvailability() {
    toggleBtnDisableAttribute(
        PREVIOUS_BTN,
        window.PREV_LIST_URL === null || window.PREV_LIST_URL === undefined
    );
    toggleBtnDisableAttribute(
        NEXT_BTN,
        window.NEXT_LIST_URL === null || window.NEXT_LIST_URL === undefined
    );
}

async function changePage(url: string) {
    const container = document.getElementById("content-container");
    const pokemonList = await getPokemons(url, 10);
    window.POKEMON_LIST = pokemonList;
    window.NEXT_LIST_URL = pokemonList.next;
    window.PREV_LIST_URL = pokemonList.previous;
    container.innerHTML = "";
    if (window.MODE === "simultaneous") {
        renderCardsSimultaneously(window.POKEMON_LIST.results);
    } else if (window.MODE === "withTimeout") {
        renderCardsSequentiallyWithTimeout(window.POKEMON_LIST.results)
    }
    setBtnsAvailability();
}

async function handleNextBtnClick() {
    await changePage(window.NEXT_LIST_URL);
}

async function handlePrevBtnClick() {
    await changePage(window.PREV_LIST_URL);
}

export function addPageBtnsListeners() {
    NEXT_BTN.addEventListener("click", handleNextBtnClick);
    PREVIOUS_BTN.addEventListener("click", handlePrevBtnClick);
}

export function removePageBtnsListeners() {
    NEXT_BTN.removeEventListener("click", handleNextBtnClick);
    PREVIOUS_BTN.removeEventListener("click", handlePrevBtnClick);
}