export default class Like {
	constructor() {
		this.likes = [];
	}

	addLike (recipe) {
		const like = {
			id: recipe.id,
			title: recipe.title,
			author: recipe.author,
			img: recipe.img
		}
		this.likes.push(like);
		return like;
	}

	deleteLike(id) {
		const index = this.likes.findIndex(item => item.id === id);
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		return this.likes.findIndex(item => item.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}
}