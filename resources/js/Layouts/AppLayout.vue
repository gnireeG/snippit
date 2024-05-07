<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';

import ProfileDropdown from '@/Comp/Navigation/ProfileDropdown.vue';
import NotificationDropdown from '@/Comp/Navigation/NotificationDropdown.vue';
import TeamDropdown from '@/Comp/Navigation/TeamDropdown.vue';
import Navbar from '@/Comp/Navigation/Navbar.vue';

const showingNavigationDropdown = ref(false);

const navOpen = ref(false);

defineProps({
    title: String,
});
</script>

<template>
    <Head :title="title" />
    <div class="main-grid relative" :class="[navOpen ? 'open' : '']">
        <div class="absolute top-4 right-4 flex gap-2 items-center">
            <team-dropdown />
            <notification-dropdown />
            <profile-dropdown />
        </div>
        <header class="relative"><navbar :navopen="navOpen" @toggleMenu="navOpen = !navOpen" /></header>
        <main>
            <slot></slot>
        </main>
    </div>
</template>
<style scoped>
.main-grid{
    display: grid;
    grid-template-columns: 68px auto;
    transition: grid-template-columns 0.5s;
}

.main-grid.open{
    grid-template-columns: 240px auto;
}
</style>