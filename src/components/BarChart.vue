<template>
  <div class="card">
    <div class="card-header"><h4>Age Range</h4></div>
    <div class="card-body chart-body">
      <Bar id="bar-id" :options="chartOptions" :data="compChartData" />
    </div>
  </div>
</template>


<script setup>

import { computed, ref } from "vue";
import { Bar } from "vue-chartjs";
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

import { useAstronautStore, useCountStore } from "@/store.ts";

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

const testData = ref({ data: [1, 30, 20, 12, 10] });

//pull computed data here

const chartOptions = ref({
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    }
  }
});

const chartData = ref({
  labels: [
    "Younger than 30 years",
    "30-39 years",
    "40-49 years",
    "50-59 years",
    "60 years and up",
  ],
  datasets: [
    {
      label: "Age Range",
      data: [],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
      ],
    },
  ],
});

const compChartData = computed(() => {
  let data = JSON.parse(JSON.stringify(chartData.value));

  data.datasets[0].data = testData.value.data;

  let astroData = JSON.parse(JSON.stringify(astroStore.astroData));

  let ageRange = [0, 0, 0, 0, 0];

  for (let i = 0; i < astroData.length; i++) {
    if (astroData[i].status.id == 1) {
      let age = astroData[i].age;
      if (age < 30) ageRange[0]++;
      else if (age < 40) ageRange[1]++;
      else if (age < 50) ageRange[2]++;
      else if (age < 60) ageRange[3]++;
      else if (age >= 60) ageRange[4]++;
    }
  }

  data.datasets[0].data = ageRange;


  return data;
});

const astroStore = useAstronautStore();

</script>

<style>

#bar-id {
  position: relative;
  width: 100%;
}
</style>
