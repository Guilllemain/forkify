import Search from './models/Search'

// Global state of the app
const state = {};

const controlSearch = async () => {
	// const query = event.target[0].value;
	const query = 'pizza';
	if (query) {
		state.search = new Search(query);

		await state.search.getRecipes();
		console.log(state.search.results);
		const recipes = state.search.results;
		recipes.forEach(recipe => {
			const html = `<li>
                            <a class="likes__link" href="#${recipe.recipe_id}">
                                <figure class="likes__fig">
                                    <img src="${recipe.image_url}" alt="${recipe.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${recipe.title}</h4>
                                    <p class="likes__author">${recipe.publisher}</p>
                                </div>
                            </a>
                        </li>`;

            document.querySelector('.likes__list').insertAdjacentHTML('afterbegin', html);
		})
	};
	
}

document.querySelector('.search').addEventListener('submit', event => {
	event.preventDefault();
	controlSearch();
});
