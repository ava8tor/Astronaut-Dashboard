<template>
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
import { useAstronautStore } from "@/store";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const astroStore = useAstronautStore();

const nationalityData = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));

  let nationName = [];
  let nations = {};
  let results = ref([]);

  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 1) {
      let astroNation = data[i].nationality;
      for (let j = 0; j < astroNation.length; j++) {
        if (!nations.hasOwnProperty(astroNation[j].name)) {
          nations[astroNation[j].name] = 1;
        } else {
          nations[astroNation[j].name]++;
        }
      }
    }
  }
  nationName = Object.keys(nations);

  for (let i = 0; i < nationName.length; i++) {
    results.value.push({ name: nationName[i], value: nations[nationName[i]] });
  }

  return results.value;
});
</script>

<style>
ul {
  height: 280px;
}

.card {
  min-width: 300px;
  max-width: 500px;
  margin: auto;
}

</style>
