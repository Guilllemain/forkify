export const elements = {
	searchForm: document.querySelector('.search'),
	listResults: document.querySelector('.results__list'),
	results: document.querySelector('.results'),
	resultsPages: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe'),
	list: document.querySelector('.shopping__list'),
	likes: document.querySelector('.likes__list'),
	likesMenu: document.querySelector('.likes__field')
}

export const renderLoader = parent => {
	const loader = `
		<div class="loader">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg
		</div>
	`;

	parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
	const loader = document.querySelector('.loader');
	if (loader) loader.parentElement.removeChild(loader);
}