<template>
    <nav class="flex flex-col justify-between p-4 top-0 sticky h-screen dark:bg-slate-950 bg-slate-100 overflow-hidden">
        <div class="relative">
            <div class="absolute top-0 right-0">
                <button title="Toggle Navigation" @click="toggleMenu"><i class="bi bi-list text-2xl"></i></button>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <Navitem href="/home">Home</Navitem>
            <Navitem href="#">About</Navitem>
            <Navitem href="#">Contact</Navitem>
        </div>
        <div>
            <Darkmodetoggle />
        </div>
    </nav>
</template>

<script setup>
import Darkmodetoggle from '@/Components/Darkmodetoggle.vue';
import { defineEmits } from 'vue';
import Navitem from '@/Components/Navigation/Navitem.vue';

const emit = defineEmits(['toggleMenu']);

function toggleMenu(){
    emit('toggleMenu');
}
</script>