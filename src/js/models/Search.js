import axios from 'axios';

export default class Search {
	constructor (query) {
		this.query = query;
	}

	async getRecipes() {
		const key = '9533a9ee416380d1df9765964d2f99fc';
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		try {
			const res = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.results = res.data.recipes;
		} catch(error) {
			console.log(error);
		}
	};
}
