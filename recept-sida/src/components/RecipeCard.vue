<template>
  <div class="recipe-card">
    <img :src="recipeImage" :alt="recipeTitle" class="recipe-card__image" />
    <div class="recipe-card__content">
      <h3 class="recipe-card__title">{{ recipeTitle }}</h3>
      <button @click="onAddToFavorites" class="recipe-card__button">
        <span v-if="isFavorite">❤️ Remove from Favorites</span>
        <span v-else>🤍 Add to Favorites</span>
      </button>
      <!-- Emit the recipe ID -->
      <button @click="onViewDetails" class="recipe-card__details-button">
        View Details
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecipeCard',
  props: {
    recipeTitle: { type: String, required: true },
    recipeImage: { type: String, required: true },
    recipeId: { type: String, required: true }, // Added recipeId prop
    isFavorite: { type: Boolean, default: false },
  },
  emits: ['toggleFavorite', 'viewDetails'],
  methods: {
    onAddToFavorites() {
      this.$emit('toggleFavorite');
    },
    onViewDetails() {
      this.$emit('viewDetails', this.recipeId); // Emit the recipeId
    },
  },
});
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.recipe-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-card__content {
  padding: 1rem;
  text-align: center;
}

.recipe-card__title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.recipe-card__button,
.recipe-card__details-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem 0;
  transition: background-color 0.2s;
}

.recipe-card__button:hover,
.recipe-card__details-button:hover {
  background-color: #369c6c;
}
</style>
