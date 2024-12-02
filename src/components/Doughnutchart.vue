<template>
    <Doughnut id="pie-id" :options="chartOptions" :data="compChartData" />
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { BarController, Chart } from "chart.js";
  import { Bar, Doughnut } from "vue-chartjs";
  import { Pie } from "vue-chartjs";
  import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from "chart.js";
  
  //   ChartJS.register(
  //     Title,
  //     Tooltip,
  //     Legend,
  //     BarElement,
  //     CategoryScale,
  //     LinearScale,
  //     PointElement,
  //     LineElement
  //   );
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const testData = ref({ data: [30, 20]});
  
  //pull computed data here
  
  const chartOptions = ref({
    responsive: false,
    maintainAspectRatio: false,
  });
  
  const chartData = ref({
    labels: ["Government", "Commercial"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
      },
    ],
  });
  
  const compChartData = computed(() => {
    let data = JSON.parse(JSON.stringify(chartData.value));
  
    data.datasets[0].data = testData.value.data;
  
    // console.log(chartData.value);
  
    return data;
  });
  </script>
  
  <style>
  /* canvas{
      border: 2px solid green;
      } */
  
  #pie-id {
    /* border: 2px solid green; */
    margin: auto;
    /* width: 300px; */
    /* min-width: 200px; */
    /* max-height: 300px; */
  }
  </style>
  