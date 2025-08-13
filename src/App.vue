<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import PasswordLock from './components/PasswordLock.vue';
import Header from './components/Header.vue';
import TransactionList from './components/TransactionList.vue';
import AddEditTransactionModal from './components/AddEditTransactionModal.vue';
import BalanceChart from './components/BalanceChart.vue';
import CategoryChart from './components/CategoryChart.vue';
import CategoryManager from './components/CategoryManager.vue';

const isUnlocked = ref(false);
const isDarkMode = ref(false);
const showAddEditModal = ref(false);
const showCategoryModal = ref(false);
const transactions = ref([]);
const categories = ref([]);
const currentDate = ref(new Date());
const editingTransaction = ref(null);

// State Management & Category Logic
const initialCategories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Entertainment' },
  { id: 5, name: 'Salary' },
];

watch([transactions, categories], ([newTransactions, newCategories]) => {
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
  localStorage.setItem('categories', JSON.stringify(newCategories));
}, { deep: true });

const addTransaction = (transaction) => {
  transactions.value.push({ ...transaction, id: Date.now() });
  showAddEditModal.value = false;
};

const addCategory = (name) => {
  categories.value.push({ id: Date.now(), name });
};

const updateCategory = ({ id, name }) => {
  const index = categories.value.findIndex(c => c.id === id);
  if (index !== -1) {
    categories.value[index].name = name;
  }
};

const deleteCategory = (id) => {
  categories.value = categories.value.filter(c => c.id !== id);
  // Optional: Handle transactions with the deleted category
};

const updateTransaction = (updatedTransaction) => {
  const index = transactions.value.findIndex(t => t.id === updatedTransaction.id);
  if (index !== -1) {
    transactions.value[index] = updatedTransaction;
  }
  showAddEditModal.value = false;
};

const deleteTransaction = (id) => {
  transactions.value = transactions.value.filter(t => t.id !== id);
};

const editTransaction = (transaction) => {
  editingTransaction.value = transaction;
  showAddEditModal.value = true;
};

const saveTransaction = (transaction) => {
  if (transaction.id) {
    updateTransaction(transaction);
  } else {
    addTransaction(transaction);
  }
};

const closeModal = () => {
  showAddEditModal.value = false;
  editingTransaction.value = null;
};

// Monthly Navigation
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1));
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1));
};

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getFullYear() === currentDate.value.getFullYear() &&
           transactionDate.getMonth() === currentDate.value.getMonth();
  });
});

// Dark Mode Logic
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('isDarkMode', isDarkMode.value);
};

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

onMounted(() => {
  // Password Lock Check
  if (sessionStorage.getItem('isUnlocked') === 'true') {
    isUnlocked.value = true;
  }
  // Dark Mode Check
  if (localStorage.getItem('isDarkMode') === 'true') {
    isDarkMode.value = true;
  }
  // Load data from localStorage
  transactions.value = JSON.parse(localStorage.getItem('transactions')) || [];
  const savedCategories = JSON.parse(localStorage.getItem('categories'));
  categories.value = savedCategories && savedCategories.length > 0 ? savedCategories : initialCategories;
});

const handleUnlocked = () => {
  isUnlocked.value = true;
};
</script>

<template>
  <main class="app">
    <PasswordLock v-if="!isUnlocked" @unlocked="handleUnlocked" />

    <div v-else :class="{ 'dark': isDarkMode }" class="min-h-screen bg-gray-100 dark:bg-dark-background text-gray-900 dark:text-dark-text-primary transition-colors duration-300">
      <Header
        :is-dark-mode="isDarkMode"
        :current-date="currentDate"
        @toggle-dark-mode="toggleDarkMode"
        @open-category-manager="showCategoryModal = true"
        @prev-month="previousMonth"
        @next-month="nextMonth"
      />

      <div class="container mx-auto p-4 md:p-6">
        <!-- Add Transaction Button -->
        <div class="flex justify-end mb-6">
          <button @click="showAddEditModal = true" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            Add Transaction
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BalanceChart :transactions="filteredTransactions" :is-dark-mode="isDarkMode" />
          <CategoryChart :transactions="filteredTransactions" :is-dark-mode="isDarkMode" />
        </div>

        <TransactionList :transactions="filteredTransactions" @edit="editTransaction" @delete="deleteTransaction" />
      </div>

      <AddEditTransactionModal
        v-if="showAddEditModal"
        :is-editing="!!editingTransaction"
        :transaction="editingTransaction"
        @close="closeModal"
        @save="saveTransaction"
        :categories="categories"
      />

      <CategoryManager
        v-if="showCategoryModal"
        :categories="categories"
        @close="showCategoryModal = false"
        @add="addCategory"
        @edit="updateCategory"
        @delete="deleteCategory"
      />
    </div>
  </main>
</template>
