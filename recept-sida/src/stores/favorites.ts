import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '../types/Recipe'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Recipe[]>([])

  function addFavorite(recipe: Recipe) {
    if (!favorites.value.find((fav) => fav.id === recipe.id)) {
      favorites.value.push(recipe)
    }
  }

  function removeFavorite(id: number) {
    favorites.value = favorites.value.filter((fav) => fav.id !== id)
  }

  return { favorites, addFavorite, removeFavorite }
})
