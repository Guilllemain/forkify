import {elements} from './base'
import {limitTitle} from './searchView'

export const renderLike = recipe => {
	const markup = `	<li>
                            <a class="likes__link" href="#${recipe.id}">
                                <figure class="likes__fig">
                                    <img src="${recipe.img}" alt="${recipe.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${limitTitle(recipe.title)}</h4>
                                    <p class="likes__author">${recipe.author}</p>
                                </div>
                            </a>
                        </li>`
    elements.likes.insertAdjacentHTML('afterend', markup)
}

export const removeLike = id => {
    const node = document.querySelector(`.likes__link[href="#${id}"]`).parentElement
    if (node) node.parentElement.removeChild(node)
}

export const toggleLikeButton = isLiked => {
    const iconPath = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconPath}`)
}

export const toggleLikeMenu = numLikes => elements.likesMenu.style.visibility = numLikes ? 'visible' : 'hidden'
