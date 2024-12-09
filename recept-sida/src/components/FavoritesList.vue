<template>
  <div class="favorites-list">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      @remove-favorite="$emit('remove-favorite', recipe.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecipeCard from './RecipeCard.vue';
import { Recipe } from '../types/Recipe';

export default defineComponent({
  components: { RecipeCard },
  props: {
    recipes: {
      type: Array as PropType<Recipe[]>,
      required: true,
    },
  },
});
</script>
