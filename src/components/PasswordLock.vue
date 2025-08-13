<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-dark-text-primary mb-6">Enter Password</h2>
      <form @submit.prevent="checkPassword">
        <input
          v-model="password"
          type="password"
          class="w-full px-4 py-3 bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-dark-text-primary border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Unlock
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const error = ref('');
const emit = defineEmits(['unlocked']);

const checkPassword = () => {
  if (password.value === '3005') {
    sessionStorage.setItem('isUnlocked', 'true');
    emit('unlocked');
    error.value = '';
  } else {
    error.value = 'Incorrect password. Please try again.';
    password.value = '';
  }
};
</script>
