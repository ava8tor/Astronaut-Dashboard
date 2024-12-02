<template>
  <!-- <canvas id="barChart"></canvas> -->
  <!-- <Bar id="bar-id" :options="chartOptions" :data="compChartData" /> -->
  <Line id="line-id" :options="chartOptions" :data="compChartData" />
</template>

<script setup>
import { computed, ref } from "vue";
import { BarController, Chart } from "chart.js";
import { planetChartData } from "../data/planet-data.js";
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { onMounted } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

// console.log(planetChartData);

// console.log(planetChartData.data);
// console.log(planetChartData.options);

const testData = ref({ data: [30, 20, 12, 10] });

//pull computed data here

const chartOptions = ref({
  responsive: false,
  maintainAspectRatio: true,
  lineTension: 1,
});

const chartData = ref({
  labels: ["30-40 years", "40-50 years", "50-60 years", "60 year and up"],
  datasets: [
    {
      label: "Age Range",
      data: [],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        // "rgba(255, 99, 132, 0.2)",
        // "rgba(255, 159, 64, 0.2)",
        // "rgba(255, 205, 86, 0.2)",
      ],
    },
  ],
});

const compChartData = computed(() => {
  let data = JSON.parse(JSON.stringify(chartData.value));

  data.datasets[0].data = testData.value.data;

//   console.log(chartData.value);

  return data;
});
</script>

<style>
/* canvas {
  border: 2px solid green;
} */

#line-id {
  position: relative;
  margin: auto;
  /* width: 100%; */
  width: 500px;
  /* max-width: 500px; */
  /* min-width: 500px; */
  max-height: 300px;
  /* height: 500px; */
}
</style>
