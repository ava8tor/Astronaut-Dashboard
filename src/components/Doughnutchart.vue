<template>
    <Doughnut id="pie-id" :options="chartOptions" :data="compChartData" />
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { BarController, Chart } from "chart.js";
  import { Bar, Doughnut } from "vue-chartjs";
  import { Pie } from "vue-chartjs";
  import { useAstronautStore } from "@/store";
  
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
    
    // console.log(data.datasets.data[0]);

    for(let i = 0; i < astroData.length; i++) {
      if(astroData[i].status.id == 1) {
        let type = astroData[i].type.name;
        if(data.labels.includes(type)) {
          let index = data.labels.indexOf(type);
          data.datasets[0].data[index]++;
        } else {
          data.labels.push(type);
          data.datasets[0].data.push(1);
        }
      }
    }

    // console.log(data.labels);
    // console.log(data.datasets);
  
    // data.datasets[0].data = testData.value.data;
  
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
  