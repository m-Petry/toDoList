<template>
  <div class="bg-white dark:bg-dark-surface shadow-md rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Transactions</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="py-3 px-4 font-semibold">Date</th>
            <th class="py-3 px-4 font-semibold">Description</th>
            <th class="py-3 px-4 font-semibold">Category</th>
            <th class="py-3 px-4 font-semibold">Type</th>
            <th class="py-3 px-4 font-semibold text-right">Value</th>
            <th class="py-3 px-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="transactions.length > 0">
          <tr v-for="transaction in transactions" :key="transaction.id" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="py-3 px-4">{{ transaction.date }}</td>
            <td class="py-3 px-4">{{ transaction.description }}</td>
            <td class="py-3 px-4">{{ transaction.category }}</td>
            <td class="py-3 px-4" :class="transaction.type === 'income' ? 'text-green-500' : 'text-red-500'">{{ transaction.type }}</td>
            <td class="py-3 px-4 text-right" :class="transaction.type === 'income' ? 'text-green-500' : 'text-red-500'">
              {{ formatCurrency(transaction.value) }}
            </td>
            <td class="py-3 px-4 text-center">
              <button @click="$emit('edit', transaction)" class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
              <button @click="$emit('delete', transaction.id)" class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center py-6 text-gray-500 dark:text-gray-400">
              No transactions yet. Add one to get started!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineEmits(['edit', 'delete']);

defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

const formatCurrency = (value) => {
  if (typeof value !== 'number') return value;
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
</script>
