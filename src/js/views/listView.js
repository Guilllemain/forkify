import {elements} from './base';

const calcStep = count => {
	if (count) {
		const [int, dec] = count.toString().split('.').map(el => Number(el));
		if (dec && int === 0) return count;
		return 1;
	}
}

export const renderItem = item => {
	const markup = `<li class="shopping__item" data-id=${item.id}>
	    <div class="shopping__count">
	        <input type="number" value="${item.count}" step="${calcStep(item.count)}" class="shopping__count-value">
	        <p>${item.unit}</p>
	    </div>
	    <p class="shopping__description">${item.ingredient}</p>
	    <button class="shopping__delete btn-tiny">
	        <svg>
	            <use href="img/icons.svg#icon-circle-with-cross"></use>
	        </svg>
	    </button>
	</li>`;
	elements.list.insertAdjacentHTML('beforeend', markup);
}

export const displayItems = (items => items.forEach(item => renderItem(item)));

export const clearItem = id => {
	const node = document.querySelector('.shopping__item');
	node.parentElement.removeChild(node);
}
