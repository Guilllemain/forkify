import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {elements, renderLoader, clearLoader} from './views/base'

// Global state of the app
const state = {};

const controlSearch = async () => {
	const query = event.target[0].value;
	if (query) {
		state.search = new Search(query);
		event.target[0].value = '';
		searchView.clearResults();
		renderLoader(elements.results);
		try {
			await state.search.getRecipes();
			clearLoader();
			await searchView.renderResults(state.search.results);
		} catch (error) {
			console.log(error);
		}
	};
}

elements.searchForm.addEventListener('submit', event => {
	event.preventDefault();
	controlSearch();
});

elements.resultsPages.addEventListener('click', event => {
	const btn = event.target.closest('button');
	if (btn) {
		const goTo = Number(btn.dataset.goto);
		console.log(goTo);
		searchView.clearResults();
		searchView.renderResults(state.search.results, gotTo);
	}
});

// Recipe Controller
const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	if (id) {
		state.recipe = new Recipe(id);
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		try {
			await state.recipe.getRecipe();
			clearLoader();
			console.log(state.recipe);
			recipeView.showRecipe(state.recipe);
		} catch (error) {
			console.log(error);
		}
	}
}

['hashchange', 'load'].forEach(event => addEventListener(event, controlRecipe));
