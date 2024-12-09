<template>
  <!-- <Pie id="pie-id" :options="chartOptions" :data="compChartData" /> -->
  <!-- {{ nationalityData }} -->
  <div class="card">
    <div class="card-header"><h4>Nationality</h4></div>
    <ul class=" chart-body table_container list-group list-group-flush overflow-auto">
      <li class="list-group-item d-flex align-items-center" v-for="item in nationalityData">
        <span class="d-flex justify-content-start">{{ item.name }}</span>  <span class="d-flex justify-content-end ms-auto">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { BarController, Chart } from "chart.js";
import { useAstronautStore } from "@/store";
import { Bar } from "vue-chartjs";
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

const testData = ref({ data: [30, 20, 12, 10] });

const nationLabels = ref([]);

//pull computed data here

const chartOptions = ref({
  responsive: false,
  maintainAspectRatio: false,
});

const chartData = ref({
  labels: ["US", "EU", "Russia", "China"],
  datasets: [
    {
      label: "Number by nationality/agency",
      data: [],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
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

const astroStore = useAstronautStore();

const nationalityData = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  // console.log(data.length);

  let nationName = [];
  // let nationCount = [];
  let nations = {};
  let results = ref([]);

  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 1) {
      let astroNation = data[i].nationality;
      for (let j = 0; j < astroNation.length; j++) {
        if (!nations.hasOwnProperty(astroNation[j].name)) {
          // nationality.push(astroNation[j].name);
          nations[astroNation[j].name] = 1;
          // results.value.push({ 'name' : astroNation[j].name, 'value':  1} )
        } else {
          nations[astroNation[j].name]++;
          // results.value.push({ 'name' : astroNation[j].name, 'value':  nations[astroNation[j].name]} )
        }
      }
    }
  }
  nationName = Object.keys(nations);
  // nationCount = Object.values(nations);

  for (let i = 0; i < nationName.length; i++) {
    results.value.push({ name: nationName[i], value: nations[nationName[i]] });
  }
  // console.log(nationName);
  // console.log(nationCount);
  // console.log(nations);
  // console.log(results.value);
  // console.log(result.value);

  return results.value;
});
</script>

<style>

/* .table_container { */
  /* margin: auto; */
  /* overflow: scroll; */
  /* border: 2px solid black; */
/* } */


ul {
  height: 280px;
}

.card {
  min-width: 300px;
  max-width: 500px;
  margin: auto;
}

</style>
