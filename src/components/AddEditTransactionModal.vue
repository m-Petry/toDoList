<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40">
    <div class="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-dark-text-primary">{{ isEditing ? 'Edit' : 'Add' }} Transaction</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Date</label>
          <input type="date" id="date" v-model="form.date" class="w-full px-4 py-2 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Description</label>
          <input type="text" id="description" v-model="form.description" class="w-full px-4 py-2 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Coffee">
        </div>
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Category</label>
          <select id="category" v-model="form.category" class="w-full px-4 py-2 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Type</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input type="radio" v-model="form.type" value="income" class="form-radio text-green-500">
              <span class="ml-2 text-green-500">Income</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="form.type" value="expense" class="form-radio text-red-500">
              <span class="ml-2 text-red-500">Expense</span>
            </label>
          </div>
        </div>
        <div class="mb-6">
          <label for="value" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Value</label>
          <input type="number" id="value" v-model="form.value" class="w-full px-4 py-2 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00">
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
          <button type="submit" class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isEditing: Boolean,
  transaction: Object,
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  date: '',
  description: '',
  category: '',
  type: 'expense',
  value: null,
  ...props.transaction,
});

const handleSubmit = () => {
  emit('save', form.value);
};
</script>
