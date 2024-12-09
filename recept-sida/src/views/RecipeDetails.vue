<template>
  <div v-if="recipe" class="recipe-details">
    <h2 class="title">{{ recipe.strMeal }}</h2>
    <div class="details-container">
      <div class="image-container">
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image" />
      </div>
      <div class="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient.name }} - {{ ingredient.measure }}
          </li>
        </ul>
      </div>
    </div>
    <div class="instructions">
      <h3>Instructions</h3>
      <p>{{ recipe.strInstructions }}</p>
    </div>
    <button class="back-button" @click="goBack">Go Back</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'RecipeDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const recipe = ref<any>(null);

    // Fetch recipe details based on the ID
    const fetchRecipeDetails = async () => {
      const id = route.params.id;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      recipe.value = data.meals ? data.meals[0] : null;
    };

    // Combine ingredients and measurements
    const ingredients = computed(() => {
      if (!recipe.value) return [];
      const items = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe.value[`strIngredient${i}`];
        const measure = recipe.value[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
          items.push({ name: ingredient, measure });
        }
      }
      return items;
    });

    const goBack = () => {
      router.push('/');
    };

    onMounted(() => {
      fetchRecipeDetails();
    });

    return {
      recipe,
      ingredients,
      goBack,
    };
  },
});
</script>

<style scoped>
.recipe-details {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.title {
  font-size: 2rem;
  margin: 1.5rem;
}

.details-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  margin: 2rem;
}

.image-container {
  flex: 1;
  text-align: center;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.ingredients {
  flex: 1;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ingredients h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.ingredients ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.ingredients li {
  margin-bottom: 0.5rem;
}

.instructions {
  text-align: left;
  margin-top: 1rem;
  margin: 0 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instructions h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.instructions p {
  white-space: pre-wrap;
}

.back-button {
  margin-top: 1rem;
  margin-bottom: 3rem;
  padding: 0.5rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #45a049;
}
</style>
