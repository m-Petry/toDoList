<template>
  <div class="bg-white dark:bg-dark-surface shadow-md rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Expense Distribution</h2>
    <apexchart
      type="donut"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

const chartData = computed(() => {
  const expenseByCategory = props.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.value;
      return acc;
    }, {});

  const labels = Object.keys(expenseByCategory);
  const series = Object.values(expenseByCategory);

  return { labels, series };
});

const series = computed(() => chartData.value.series);

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350,
  },
  labels: chartData.value.labels,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
  legend: {
    labels: {
      colors: props.isDarkMode ? '#E5E7EB' : '#1F2937',
    }
  },
  tooltip: {
    theme: props.isDarkMode ? 'dark' : 'light',
    y: {
      formatter: function (val) {
        return "$ " + val.toFixed(2);
      },
    },
  },
}));
</script>
