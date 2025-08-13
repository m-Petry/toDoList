<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-dark-text-primary">Manage Categories</h2>

      <!-- Add Category Form -->
      <form @submit.prevent="addCategory" class="flex items-center mb-6">
        <input
          v-model="newCategoryName"
          type="text"
          placeholder="New category name"
          class="flex-grow px-4 py-2 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-r-lg"
        >
          Add
        </button>
      </form>

      <!-- Category List -->
      <div class="space-y-3 max-h-64 overflow-y-auto">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between bg-gray-50 dark:bg-dark-background p-3 rounded-lg"
        >
          <span class="text-gray-800 dark:text-dark-text-secondary">{{ category.name }}</span>
          <div>
            <button @click="editCategory(category)" class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
            <button @click="deleteCategory(category.id)" class="text-red-500 hover:text-red-700">Delete</button>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button @click="$emit('close')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  categories: Array,
});

const emit = defineEmits(['close', 'add', 'edit', 'delete']);

const newCategoryName = ref('');

const addCategory = () => {
  if (newCategoryName.value.trim()) {
    emit('add', newCategoryName.value.trim());
    newCategoryName.value = '';
  }
};

const editCategory = (category) => {
  const newName = prompt('Enter new name for category:', category.name);
  if (newName && newName.trim() !== category.name) {
    emit('edit', { id: category.id, name: newName.trim() });
  }
};

const deleteCategory = (id) => {
  if (confirm('Are you sure you want to delete this category?')) {
    emit('delete', id);
  }
};
</script>
