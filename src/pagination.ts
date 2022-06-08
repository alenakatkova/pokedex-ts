import getPokemons from "./api/getPokemons";
import fillBoardWithPokemons from "./fillBoardWithPokemons";

function toggleBtnDisableAttribute(btn: HTMLElement, shouldBeDisabled: boolean) {
    if (shouldBeDisabled) {
        btn.setAttribute("disabled", "");
    } else {
        btn.removeAttribute("disabled");
    }
}

// TODO disable btns when mode is not chosen
export function updateBtnsAvailability(previousUrl: string, nextUrl: string) {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    toggleBtnDisableAttribute(prevBtn, previousUrl === null);
    toggleBtnDisableAttribute(nextBtn, nextUrl === null);
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

export function addPageBtnsListeners() {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    nextBtn.addEventListener("click", handleNextBtnClick);
    prevBtn.addEventListener("click", handlePrevBtnClick);
}

export function removePageBtnsListeners() {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    nextBtn.removeEventListener("click", handleNextBtnClick);
    prevBtn.removeEventListener("click", handlePrevBtnClick);
}