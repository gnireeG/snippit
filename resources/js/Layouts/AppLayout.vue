<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

import Navbar from '@/Comp/Navigation/Navbar.vue';

const showingNavigationDropdown = ref(false);

const navOpen = ref(false);
</script>

<template>
    <div class="main-grid relative" :class="[navOpen ? 'open' : '']">
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