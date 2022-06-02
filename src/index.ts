import PokemonDetails from "./interfaces/PokemonDetails";
import getPokemonDetails from "./api/getPokemonDetails";
import getPokemons from "./api/getPokemons";
import { Pokemon, PokemonList } from "./interfaces/PokemonList";

const board = document.getElementById("board");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const template = <HTMLTemplateElement>document.getElementById("card");

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

let pokemonList = await getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=5", 5);
let previousListUrl = pokemonList.previous;
let nextListUrl = pokemonList.next;

const appendPokemonCard = async (name: string) => {
    const pokemon : PokemonDetails = await getPokemonDetails(name);
    const clone = <HTMLElement>template.content.cloneNode(true);
    const nameContainer = clone.querySelector(".name");
    const picture = clone.querySelector(".picture");
    picture.setAttribute("src", pokemon.sprites.front_default)
    nameContainer.textContent = name;
    board.appendChild(clone);
};

const fillBoardWithPokemons = (pokemons: Pokemon[]) => {
    pokemons.map(async (pokemon) => {
        await appendPokemonCard(pokemon.name)
    })
}

fillBoardWithPokemons(pokemonList.results);
updateBtnsAvailability();

const changePage = async (url: string) => {
    pokemonList = await getPokemons(url, 5);
    nextListUrl = pokemonList.next;
    previousListUrl = pokemonList.previous;
    board.innerHTML = "";
    fillBoardWithPokemons(pokemonList.results);
    updateBtnsAvailability();
}

nextBtn.addEventListener("click", async () => {
    await changePage(nextListUrl);
});

prevBtn.addEventListener("click", async () => {
    await changePage(previousListUrl);
});

