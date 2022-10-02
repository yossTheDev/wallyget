export const getCategories = (): Map<string, string> => {
	const categories = new Map();
	categories.set('abstract', 1);
	categories.set('animal', 2);
	categories.set('anime', 3);
	categories.set('artistics', 4);
	categories.set('celebrity', 7);
	categories.set('comics', 8);
	categories.set('dark', 9);
	categories.set('earth', 10);
	categories.set('fantasy', 11);
	categories.set('food', 12);
	categories.set('game', 14);
	categories.set('holiday', 15);
	categories.set('humor', 13);
	categories.set('manmade', 16);
	categories.set('men', 17);
	categories.set('military', 18);
	categories.set('misc', 19);
	categories.set('movies', 20);
	categories.set('music', 22);
	categories.set('photography', 24);
	categories.set('products', 25);
	categories.set('religious', 26);
	categories.set('sciFi', 27);
	categories.set('sport', 28);
	categories.set('technology', 30);
	categories.set('tvshows', 29);
	categories.set('vehicles', 31);
	categories.set('videogames', 32);
	categories.set('weapons', 34);
	categories.set('women', 33);

	return categories;
};

export const hasCategory = (category: string): boolean => {
	return getCategories().has(category);
};

export const getCategoryCode = (category: string): any => {
	return getCategories().get(category);
};
