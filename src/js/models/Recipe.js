import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
	constructor (id) {
		this.id = id;
		this.servings = 4;
	}
	async getRecipe() {
		try {
			const res = await axios.get(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
			this.calcTime();
			this.parseIngredients();
		} catch(error) {
			console.log(error);
		}
	}

	calcTime() {
		// Assuming we need 15 minutes for 3 ingredients
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

		const newIngredients = ingredients.map(el => {
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, index) => {
				ingredient = ingredient.replace(unit, unitsShort[index])
			})
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

			const arrIng = ingredient.split(' ');
			const unitIndex = arrIng.findIndex(element => unitsShort.includes(element));

			let objIng;
			if (unitIndex > -1) {
				const arrCount = arrIng.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}
				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				}
			} else if (parseInt(arrIng[0], 10)) {
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				}
			} else if (unitIndex === -1) {
				objIng = {
					count: '',
					unit: '',
					ingredient //same as ingredient: ingredient
				}
			}

			return objIng;
		})
		this.ingredients = newIngredients;
	}
}
