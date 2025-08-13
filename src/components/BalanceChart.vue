<template>
  <div class="bg-white dark:bg-dark-surface shadow-md rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Monthly Balance</h2>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
  isDarkMode: Boolean,
});

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Income', 'Expenses'],
    labels: {
      style: {
        colors: props.isDarkMode ? '#E5E7EB' : '#1F2937',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Amount (USD)',
      style: {
        color: props.isDarkMode ? '#E5E7EB' : '#1F2937',
      },
    },
    labels: {
      style: {
        colors: props.isDarkMode ? '#E5E7EB' : '#1F2937',
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val.toFixed(2);
      },
    },
  },
  colors: ['#10B981', '#EF4444'],
}));

const series = computed(() => {
  const income = props.transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.value, 0);

  const expenses = props.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.value, 0);

  return [{
    name: 'Amount',
    data: [income, expenses],
  }];
});
</script>
