<template>
  <div class="home">
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.idMeal"
        :recipeTitle="recipe.strMeal"
        :recipeImage="recipe.strMealThumb"
        :isFavorite="favorites.includes(recipe.idMeal)"
        @toggleFavorite="() => toggleFavorite(recipe.idMeal)"
        @viewDetails="viewRecipeDetails(recipe.idMeal)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RecipeCard from '../components/RecipeCard.vue';

export default defineComponent({
  name: 'Home',
  components: { RecipeCard },
  setup() {
    const recipes = ref<any[]>([]);
    const favorites = ref<number[]>([]);
    const router = useRouter();

    // Fetch recipes from the API
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        recipes.value = data.meals || [];
        localStorage.setItem('recipes', JSON.stringify(recipes.value));
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Attempt to load recipes from localStorage as a fallback
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
          recipes.value = JSON.parse(storedRecipes);
        }
      }
    };

    // Load favorites from localStorage
    const loadFavorites = () => {
      favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
    };

    // Add/remove a recipe from favorites
    const toggleFavorite = (id: number) => {
      if (favorites.value.includes(id)) {
        favorites.value = favorites.value.filter((favId) => favId !== id); // Remove from favorites
      } else {
        favorites.value.push(id); // Add to favorites
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    // Navigate to recipe details
    const viewRecipeDetails = (id: number) => {
      router.push(`/recipe/${id}`);
    };

    onMounted(() => {
      fetchRecipes();
      loadFavorites();
    });

    return { recipes, favorites, toggleFavorite, viewRecipeDetails };
  },
});
</script>

<style scoped>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>


<style scoped>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
  justify-content: center;
}
</style>
