<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import BarChart from "./components/BarChart.vue"
import PieChart from "./components/PieChart.vue";
import LineChart from "./components/LineChart.vue";
import Doughnutchart from "./components/Doughnutchart.vue";
import { useAstronautStore } from "./store";
// import { inject } from 'vue';
import axios from 'axios';
import { ref } from "vue";



const astroStore = useAstronautStore();
astroStore.fetchAstroData();
// const axios: any = inject('axios')

// const getList = (): void => {  
//   axios.get('https://ll.thespacedevs.com/2.3.0/astronauts')
//     .then(( response: { data: any}) => {
//       console.log(response.data)
//     })

// console.log("getlist" + getList);
// }

// console.log("checking");
// const test = ref (null);

// axios.get('https://ll.thespacedevs.com/2.3.0/astronauts')
//     .then(( response: { data: any}) => {
//       test.value = response.data;
//     });

// console.log(test.value);
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div> -->
    <div class="sidebar">
      <h2>Astronaut Dashboard</h2>
      <a href="#home">Dashboard</a>
      <a href="#services">Table</a>
    </div>
  </header>

  <main class="main-content">
    <!-- <TheWelcome /> -->
    <h1>View statistics here</h1>
    <h2>Row 1</h2>
    <div class="row">
      <div class="col">
        Card_1
       <!-- <canvas id="myChart"></canvas> -->
      </div>
      <div class="col">Card_2</div>
      <div class="col">Card_3</div>
      <div class="col">Card_4

      </div>
    </div>
    <h2>Row 2</h2>
    <div class="row">
      <div class="col col-lg-6 mx-6">Chart_1 (line/bar)
        <BarChart></BarChart>
      </div>
      <div class="col col-lg-6 mx-6">Chart_2 (pie)
        <PieChart></PieChart>
      </div>
    </div>
    <h2>Row 3</h2>
    <div class="row">
      <div class="col col-lg-6 mx-6">Chart_3 (line/bar)
         <LineChart></LineChart>
      </div>
      <div class="col col-lg-6 mx-6">Chart_4 (pie)
        <Doughnutchart></Doughnutchart>
      </div>
    </div>
    
  </main>
</template>

<style scoped>
/* body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
} */

/* Sidebar styles */
.sidebar {
  height: 100vh;
  /* Full height */
  width: 250px;
  /* Set the width of the sidebar */
  position: fixed;
  /* Keep it fixed on the left side */
  top: 0;
  left: 0;
  background-color: #333;
  /* Dark background color */
  color: white;
  /* Text color */
  padding-top: 20px;
}

.sidebar a {
  display: block;
  color: white;
  /* Text color */
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
}

.sidebar a:hover {
  background-color: #575757;
  /* Hover effect */
}

.row {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
}

.col{ 
  /* border: 1px solid black; */
  margin: auto;
}

/* Main content */
.main-content {
  margin-left: 260px;
  /* Offset the content to the right of the sidebar */
  padding: 20px;
}

@media (max-width: 1250px) {
  .sidebar {
    /* height: 100vh; */
    /* Full height */
    /* width: 250px; */
    width: 100%;
    height: 100%;
    /* Set the width of the sidebar */
    position: relative;
    background-color: #333;
    padding-top: 20px;
    /* border: 10px solid bisque; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin: auto; */
  }

  .main-content{
    margin: 0;
  }
}

/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    border: 1px solid white;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
