<template>
    <div class="card">
        <h4 class="card-header justify-content-center">{{ label }}</h4> 
        <div class="card-body">
            <p class="card-text">{{ amount }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps(['label', 'amount']);
</script>

<style>
.card-header, .card-body {
    text-align: center;
}
</style>