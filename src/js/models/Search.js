import axios from 'axios'
import {key, proxy} from '../config'

export default class Search {
	constructor (query) {
		this.query = query
	}

	async getRecipes() {
		try {
			const res = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
			this.results = res.data.recipes
		} catch(error) {
			console.log(error)
		}
	}
}
