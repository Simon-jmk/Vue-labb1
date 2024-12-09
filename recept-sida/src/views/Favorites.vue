<template>
  <div class="favorites">
    <div v-if="favorites.length > 0" class="recipe-list">
      <RecipeCard
        v-for="id in favorites"
        :key="id"
        :recipeTitle="getRecipeTitle(id)"
        :recipeImage="getRecipeImage(id)"
        :isFavorite="true"
        @toggleFavorite="removeFromFavorites(id)"
      />
    </div>
    <p v-else>No favorite recipes yet. Go back and add some!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';

export default defineComponent({
  name: 'Favorites',
  components: { RecipeCard },
  setup() {
    const favorites = ref<number[]>([]);
    const recipes = ref<any[]>([]);

    const loadFavorites = () => {
      favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
    };

    const loadRecipes = () => {
      recipes.value = JSON.parse(localStorage.getItem('recipes') || '[]');
    };

    const getRecipeTitle = (id: number) => {
      return recipes.value.find((recipe: any) => recipe.idMeal === id)?.strMeal || '';
    };

    const getRecipeImage = (id: number) => {
      return recipes.value.find((recipe: any) => recipe.idMeal === id)?.strMealThumb || '';
    };

    const removeFromFavorites = (id: number) => {
      favorites.value = favorites.value.filter((favId) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    onMounted(() => {
      loadFavorites();
      loadRecipes();
    });

    return {
      favorites,
      getRecipeTitle,
      getRecipeImage,
      removeFromFavorites,
    };
  },
});
</script>

<style scoped>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
</style>
