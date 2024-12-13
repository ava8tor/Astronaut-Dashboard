<template>
  <div class="card">
    <div class="card-header"><h4>Employment type</h4></div>
    <div class="card-body chart-body">
      <Doughnut id="pie-id" :options="chartOptions" :data="compChartData" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { BarController, Chart } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { useAstronautStore } from "@/store";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

//pull computed data here

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
    }
  }
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgba(54, 162, 235)",
        "rgba(75, 192, 192)",
        "rgba(255, 99, 132)",
      ],
    },
  ],
});

const astroStore = useAstronautStore();

const compChartData = computed(() => {
  let astroData = JSON.parse(JSON.stringify(astroStore.astroData));

  let data = JSON.parse(JSON.stringify(chartData.value));

  for (let i = 0; i < astroData.length; i++) {
    if (astroData[i].status.id == 1) {
      let type = astroData[i].type.name;
      if (data.labels.includes(type)) {
        let index = data.labels.indexOf(type);
        data.datasets[0].data[index]++;
      } else {
        data.labels.push(type);
        data.datasets[0].data.push(1);
      }
    }
  }

  return data;
});
</script>

<style>
#pie-id {
  position: relative;
  margin: auto;
  width: 100%;
}
</style>
