import apiClient from "./api-client";

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type Ingredient = {
  name: string;
  measure: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  ingredients: Ingredient[];
};

export const getMealCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get("/categories.php");
  return response.data.categories;
};

export const getMealsByCategory = async (category: string): Promise<Recipe[]> => {
  const response = await apiClient.get("/filter.php", {
    params: { c: category }
  });
  return response.data.meals || [];
};

export const getMealById = async (id: string): Promise<MealDetail> => {
  const response = await apiClient.get("/lookup.php", {
    params: { i: id }
  });

  const meal = response.data.meals[0];

  // Parse ingredients and measures
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }

  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
    strMealThumb: meal.strMealThumb,
    strTags: meal.strTags,
    strYoutube: meal.strYoutube,
    ingredients
  };
};

export const searchMealsByName = async (query: string): Promise<Recipe[]> => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const response = await apiClient.get("/search.php", {
    params: { s: query }
  });

  return response.data.meals || [];
};
