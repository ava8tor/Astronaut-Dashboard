<script setup lang="ts">
import BarChart from "./components/BarChart.vue";
import ListCard from "./components/ListCard.vue";
import LineChart from "./components/LineChart.vue";
import Doughnutchart from "./components/Doughnutchart.vue";
import Card from "./components/Card.vue";
import { useAstronautStore } from "./store";
import { ref, computed } from "vue";

const astroStore = useAstronautStore();
astroStore.fetchAstroData();

const astronautsActive = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 1) {
      count++;
    }
  }

  let results = { label: "Total Active", amount: count };

  return results;
});

const astronautsInTraining = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 3) {
      count++;
    }
  }

  let results = { label: "Total In Training", amount: count };

  return results;
});

const astronautsInSpace = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].in_space == true) {
      count++;
    }
  }

  let results = { label: "Total In Space", amount: count };

  return results;
});

const astronautsWhoHaveFlown = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].flights_count > 0 && data[i].status.id == 1) {
      count++;
    }
  }

  let results = { label: "Total Have flown", amount: count };

  return results;
});

const astronautsWhoHaveSpaceWalked = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].spacewalks_count > 0 && data[i].status.id == 1) {
      count++;
    }
  }

  let results = { label: "Total Have spacewalked", amount: count };

  return results;
});
</script>

<template>
  <header>
    <div class="topHeader"></div>
    <div class="sidebar">
      <h2>Astronaut Dashboard</h2>
    </div>
    <div class="background-image"></div>
  </header>

  <main class="main-content">
    <div class="row">
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card
          :label="astronautsInTraining.label"
          :amount="astronautsInTraining.amount"
        />
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card
          :label="astronautsActive.label"
          :amount="astronautsActive.amount"
        />
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card
          :label="astronautsInSpace.label"
          :amount="astronautsInSpace.amount"
        />
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card
          :label="astronautsWhoHaveFlown.label"
          :amount="astronautsWhoHaveFlown.amount"
        />
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card
          :label="astronautsWhoHaveSpaceWalked.label"
          :amount="astronautsWhoHaveSpaceWalked.amount"
        />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col mt-2 col-lg-6 mx-6">
        <BarChart></BarChart>
      </div>
      <div class="col mt-2 col-lg-6 mx-6">
        <ListCard></ListCard>
      </div>
    </div>
    <div class="row mt-2 mb-3">
      <div class="col mt-2 col-lg-6 mx-6">
        <LineChart></LineChart>
      </div>
      <div class="col mt-2 col-lg-6 mx-6 gap-2">
        <Doughnutchart></Doughnutchart>
      </div>
    </div>
  </main>
  <footer>
    <div class="footer-content">
      <p>
        Info is populated by test data from dev endpoint:<a href="https://thespacedevs.com/llapi">https://thespacedevs.com/llapi</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.topHeader {
  background-color: rgba(51, 51, 51, 0.7);
  position: fixed;
  top: 0;
  left: 210px;
  height: 10vh;
  width: 100%;
  z-index: 1;
}

.sidebar {
  height: 100vh;
  width: 210px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.7);
  color: white;
  padding-top: 20px;
  z-index: 2;
}

.sidebar > h2 {
  text-align: center;
}

.sidebar a {
  display: block;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
}

.sidebar a:hover {
  background-color: #575757;
}

.background-image {
  /* background-image: url(assets/maxresdefault.png); */
  background-image: url(assets/imrs.png);
  /* background-image: url(assets/SpaceX-Polaris-Dawn-Spacewalk.jpg); */
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  margin: auto;
}

.main-content {
  margin-left: 210px;
  margin-top: 10vh;
  height: 86vh;
  padding: 25px;
  overflow-y: auto;
  /* overflow-x: hidden; */
}

.chart-body {
  height: 350px;
}

.footer-content {
  background-color: gray;
  /* height: 5vh; */
  margin: auto;
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  padding: 10px;
  /* white-space: pre-wrap; */

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.footer-content > p {
  margin: auto;
  align-items: center;
  text-align: center;
}

.footer-content > p > a {
  margin-left: 0.5rem;
  color: black;
}

@media (max-width: 1250px) {
  .topHeader {
    display: none;
  }
  .sidebar {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    position: relative;
    background-color: #333;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-content {
    margin: 0;
    margin-bottom: 20px;
    height: 89vh;
    /* padding: 15px */
  }

  .footer-content {
    padding: 10px;

  }
}
</style>
