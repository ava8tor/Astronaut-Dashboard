<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import BarChart from "./components/BarChart.vue"
import ListCard from "./components/ListCard.vue";
import LineChart from "./components/LineChart.vue";
import Doughnutchart from "./components/Doughnutchart.vue";
import Card from "./components/Card.vue";
import { useAstronautStore } from "./store";
// import { inject } from 'vue';
import axios from 'axios';
import { ref, computed } from "vue";



const astroStore = useAstronautStore();
astroStore.fetchAstroData();

const cardOneLabel = ref("Card One");
const cardOneAmount = ref("0");

const astronautsActive = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 1) {
      count++;
    }
  }
  
  let results = {label: "Total Active", amount: count};

  return results;


}); 


const astronautsInTraining = computed(() => {
  let data = JSON.parse(JSON.stringify(astroStore.astroData));
  let count = 0;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].status.id == 3) {
      count++;
    }
  }
  
  let results = {label: "Total In Training", amount: count};

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
  
  let results = {label: "Total In Space", amount: count};

  return results;
}); 

const astronautsWhoHaveFlown = computed(() => {

let data = JSON.parse(JSON.stringify(astroStore.astroData));
let count = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].flights_count > 0 &&  data[i].status.id == 1) {
    count++;
  }
}

let results = {label: "Total Have flown", amount: count};

return results;
}); 

const astronautsWhoHaveSpaceWalked = computed(() => {

let data = JSON.parse(JSON.stringify(astroStore.astroData));
let count = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].spacewalks_count > 0 &&  data[i].status.id == 1) {
    count++;
  }
}

let results = {label: "Total Have spacewalked", amount: count};

return results;
}); 



</script>

<template>
  <header>
    <div class="topHeader"></div>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div> -->

    <div class="sidebar">
      <h2>Astronaut Dashboard</h2>
      <!-- <a href="#home">Dashboard</a>
      <a href="#services">Table</a> -->
    </div>
  </header>

  <main class="main-content">
    <!-- <TheWelcome /> -->
    <!-- <h2>Displaying Live statistics</h2> -->
    <!-- <h2>Row 1</h2> -->
    <div class="row">
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card :label="astronautsInTraining.label" :amount="astronautsInTraining.amount"/>
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card :label="astronautsActive.label" :amount="astronautsActive.amount"/>
       <!-- <canvas id="myChart"></canvas> -->
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card :label="astronautsInSpace.label" :amount="astronautsInSpace.amount"/>
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card :label="astronautsWhoHaveFlown.label" :amount="astronautsWhoHaveFlown.amount"/>
      </div>
      <div class="col mt-sm-2 mt-md-2 mt-lg-0">
        <Card :label="astronautsWhoHaveSpaceWalked.label" :amount="astronautsWhoHaveSpaceWalked.amount"/>
      </div>
    </div>
    <!-- <h2>Row 2</h2> -->
    <div class="row mt-3">
      <div class="col mt-sm-2 col-lg-6 mx-6">
        <BarChart></BarChart>
      </div>
      <div class="col mt-sm-2 mt-2 col-lg-6 mx-6">
        <ListCard></ListCard>
      </div>
    </div>
    <!-- <h2>Row 3</h2> -->
    <div class="row mt-3">
      <div class="col mt-sm-2 col-lg-6 mx-6">
         <LineChart></LineChart>
      </div>
      <div class="col mt-sm-2 col-lg-6 mx-6">
        <Doughnutchart></Doughnutchart>
      </div>
    </div>
  </main>
  <footer>
    <div class="footer-content">
      <p>Live data is populated from: <a href="https://thespacedevs.com/llapi">https://thespacedevs.com/llapi</a></p>
    </div>
  </footer>
</template>

<style scoped>
/* body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
} */

/* Sidebar styles */

.topHeader {
  background-color: #333;
  position: fixed;
  top: 0;
  height: 10vh;
  width: 100%;
  z-index: 1;
}

.sidebar {
  height: 100vh;
  /* Full height */
  width: 210px;
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
  z-index: 2;
}

.sidebar > h2 {
  text-align: center;
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
  /* border: 1px solid black; */
}

.col{ 
  /* border: 1px solid black; */
  margin: auto;
}


/* Main content */
.main-content {
  margin-left: 210px;
  margin-top: 90px;
  /* Offset the content to the right of the sidebar */
  padding: 20px;
  background-color: bisque;
  min-height: 100%;
  height: 86vh;
  overflow: auto;
  /* height: 85vh; */
  /* background-image: url(assets/maxresdefault.png);
  background-repeat: no-repeat;
  background-size: cover; */
}

.chart-body{
  height: 350px;
}

.footer-content{
  /* margin-left: 210px; */
  background-color: gray;
  height: 5vh;
  /* min-height: 100%; */
  /* position: relative; */
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;

}

.footer-content > p {
  display: flex;
  justify-content: center;
}

@media (max-width: 1250px) {


  .topHeader{

    display: none;
  }
  .sidebar {
    /* height: 100vh; */
    /* Full height */
    /* width: 250px; */
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
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
    margin-top: 0;
    height: 90vh
  }
}


</style>
