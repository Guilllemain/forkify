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
			console.log(state.search.results);
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
		searchView.clearResults();
		searchView.renderResults(state.search.results, gotTo)
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
			recipeView.showRecipe(state.recipe);
		} catch (error) {
			console.log(error);
		}
	}
}

const ingredients = [
            "2 jalapeno peppers, cut in half lengthwise and seeded",
            "2 (1/14 Teaspoon) slices sour dough bread",
            "1 tablespoon butter, room temperature",
            "2 1/2 tablespoons cream cheese, room temperature",
            "1/2 cup jack and cheddar cheese, shredded",
            "1 tablespoon tortilla chips, crumbled\n"
        ];

['hashchange', 'load'].forEach(event => addEventListener(event, controlRecipe));
