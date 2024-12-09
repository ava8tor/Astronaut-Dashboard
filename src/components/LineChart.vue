<template>
  <div class="card">
    <div class="card-header"><h4>Latest Launch mission per Astronaut</h4></div>
    <div class="card-body chart-body">
      <Line id="line-id" :options="chartOptions" :data="compChartData" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { BarController, Chart } from "chart.js";
import { planetChartData } from "../data/planet-data.js";
import { useAstronautStore } from "@/store";
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

const yearLabels = ref([]);

//pull computed data here

const chartOptions = ref({
  responsive: false,
  maintainAspectRatio: true,
  lineTension: 0.2,
  plugins: {
    legend: {
      display: false
    }
  }
});

let chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Recent Launch mission",
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

const astroStore = useAstronautStore();

const compChartData = computed(() => {
  let astroData = JSON.parse(JSON.stringify(astroStore.astroData));
  let years = [];
  let yearsCount = {};
  let results = ref([]);

  for (let i = 0; i < astroData.length; i++) {
    if (astroData[i].status.id == 1 && astroData[i].last_flight != null) {
      let d = new Date(astroData[i].last_flight);
      let y = d.getFullYear();

      // if (y == null) {
      //   console.log(y);
      //   console.log(astroData[i]);
      // }

      if (!years.includes(y)) {
        years.push(y);
        yearsCount[y] = 1;
      } else {
        yearsCount[y]++;
      }

      // console.log(astroData[i])
      //2021-04-23T09:49:02Z
    }
  }

  years.sort();

  for (let i = 0; i < years.length; i++) {
    let y = years[i];
    results.value.push(yearsCount[y]);
  }

  // console.log(years);
  // console.log(results.value);
  yearLabels.value = years;

  let data = JSON.parse(JSON.stringify(chartData.value));
  data.datasets[0].data = results.value;
  data.labels = years;

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
  width: 100%;
  /* max-width: 500px; */
  /* min-width: 500px; */
  max-height: 300px;
  /* height: 500px; */
}
</style>
