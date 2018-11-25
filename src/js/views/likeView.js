import {elements} from './base'

export const renderLike = recipe => {
	const markup = `	<li>
                            <a class="likes__link" href="#${recipe.id}">
                                <figure class="likes__fig">
                                    <img src="${recipe.img}" alt="${recipe.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${recipe.title}</h4>
                                    <p class="likes__author">${recipe.author}</p>
                                </div>
                            </a>
                        </li>`;
    elements.likes.insertAdjacentHTML('afterend', markup);
}