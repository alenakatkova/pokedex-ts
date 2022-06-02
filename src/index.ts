import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";
import getPokemons from "./api/getPokemons";
import { Pokemon, PokemonList } from "./interfaces/PokemonList";

const board = document.getElementById("board");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

const toggleBtnDisableAttribute = (btn: HTMLElement, shouldBeDisabled: boolean) => {
    if (shouldBeDisabled) {
        btn.setAttribute("disabled", "");
    } else {
        btn.removeAttribute("disabled");
    }
};

const updateBtnsAvailability = () => {
    toggleBtnDisableAttribute(prevBtn, previousListUrl === null);
    toggleBtnDisableAttribute(nextBtn, nextListUrl === null);
};

//const pokemon : PokemonDetails = await getPokemonDetails("pikachu");
let pokemonList = await getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100", 100);
let previousListUrl = pokemonList.previous;
let nextListUrl = pokemonList.next;

board.innerText = JSON.stringify(pokemonList)
updateBtnsAvailability();

const changePage = async (url: string) => {
    pokemonList = await getPokemons(url, 100);
    nextListUrl = pokemonList.next;
    previousListUrl = pokemonList.previous;
    board.innerText = JSON.stringify(pokemonList);
    updateBtnsAvailability();
}

nextBtn.addEventListener("click", async () => {
    await changePage(nextListUrl);
});

prevBtn.addEventListener("click", async () => {
    await changePage(previousListUrl);
});

