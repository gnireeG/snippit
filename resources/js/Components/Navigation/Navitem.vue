<template>
    <Link :href="href" :title="title"><slot /></Link>
</template>
<script setup>
import { defineProps } from 'vue';
import { Link } from '@inertiajs/vue3'
const props = defineProps({
    href: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
});
   
</script>