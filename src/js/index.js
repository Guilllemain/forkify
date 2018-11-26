import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Like from './models/Like'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likeView from './views/likeView'
import {elements, renderLoader, clearLoader} from './views/base'

// Global state of the app
const state = {};

// Searches Controller
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
		searchView.clearResults();
		searchView.renderResults(state.search.results, goTo);
	}
});

// Recipes Controller
const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	if (id) {
		state.recipe = new Recipe(id);
		recipeView.clearRecipe();
		if (state.search) searchView.highlightSelected(id);
		renderLoader(elements.recipe);
		try {
			await state.recipe.getRecipe();
			clearLoader();
			console.log(state.recipe);
			recipeView.showRecipe(state.recipe, state.likes.isLiked(id));
		} catch (error) {
			console.log(error);
		}
	}
}

	state.likes = new Like();
    likeView.toggleLikeMenu(state.likes.getNumLikes());

//Likes Controller
const controlLikes = () => {
    if (!state.likes) state.likes = new Like();
    const likeId = state.recipe.id;
    if (state.likes.isLiked(likeId)) {
        state.likes.deleteLike(likeId);
        likeView.removeLike(likeId);
    } else {
        state.likes.addLike(state.recipe);
        console.log(state);
        likeView.renderLike(state.recipe);
    }
    likeView.toggleLikeButton(state.likes.isLiked(likeId));
    likeView.toggleLikeMenu(state.likes.getNumLikes());
}

['hashchange', 'load'].forEach(event => addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', event => {
	if (event.target.matches('.btn-decrease, .btn-decrease *')) {
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateIngredients(state.recipe);
		}
	} else if (event.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc')
		recipeView.updateIngredients(state.recipe);
	} else if (event.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
		state.list = new List();
		state.recipe.ingredients.forEach(ingredient => {
			const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
			listView.renderItem(item);
		});
	} else if (event.target.matches('.recipe__love, .recipe__love *')) {
		controlLikes();
	}
})

elements.list.addEventListener('click', event => {
	const id = event.target.closest('.shopping__item').dataset.id;
	if (event.target.matches('button, button *')) {
		state.list.deleteItem(id);
		listView.clearItem(id);
	} else if (event.target.matches('input')) {
		console.log(state.list.items);
		const newCount = Number(event.target.value);
		state.list.updateCount(id, newCount);
	}
})