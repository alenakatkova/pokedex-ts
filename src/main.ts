import getPokemons from "./api/getPokemons";
import fillBoardWithPokemons from "./fillBoardWithPokemons";
import {updateBtnsAvailability} from "./pagination";
import {PokemonList} from "./interfaces/PokemonList";

let pokemonList: PokemonList;
let previousListUrl: string | null;
let nextListUrl: string | null;

async function changePage(url: string) {
    const container = document.getElementById("content-container");
    const pokemonList = await getPokemons(url, 10);
    nextListUrl = pokemonList.next;
    previousListUrl = pokemonList.previous;
    container.innerHTML = "";
    fillBoardWithPokemons(pokemonList.results);
    updateBtnsAvailability(previousListUrl, nextListUrl);
}

export function addButtonsEventListeners() {
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    nextBtn.addEventListener("click", async () => {
        await changePage(nextListUrl);
    });

    prevBtn.addEventListener("click", async () => {
        await changePage(previousListUrl);
    });
}

function retrieveInitialPokemonList(): Promise<PokemonList> {
    return getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10", 10);
}

export async function run() {
    pokemonList = await retrieveInitialPokemonList();
    previousListUrl = pokemonList.previous;
    nextListUrl = pokemonList.next;
    console.log(pokemonList, previousListUrl, nextListUrl)
    fillBoardWithPokemons(pokemonList.results);
    updateBtnsAvailability(previousListUrl, nextListUrl);
    addButtonsEventListeners();
}