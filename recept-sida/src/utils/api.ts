const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

export async function fetchRecipesByCategory(category: string) {
  const response = await fetch(`${BASE_URL}filter.php?c=${category}`)
  if (!response.ok) throw new Error('Failed to fetch recipes by category.')
  return response.json()
}

export async function fetchRecipeById(id: number) {
  const response = await fetch(`${BASE_URL}lookup.php?i=${id}`)
  if (!response.ok) throw new Error('Failed to fetch recipe details.')
  return response.json()
}

export async function searchRecipes(query: string) {
  const response = await fetch(`${BASE_URL}search.php?s=${query}`)
  if (!response.ok) throw new Error('Failed to search recipes.')
  return response.json()
}
