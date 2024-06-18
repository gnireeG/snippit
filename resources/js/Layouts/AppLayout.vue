<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { Head, router, usePage } from '@inertiajs/vue3';
import MobileHeader from '@/Comp/Navigation/MobileHeader.vue';
import ProfileDropdown from '@/Comp/Navigation/ProfileDropdown.vue';
import NotificationDropdown from '@/Comp/Navigation/NotificationDropdown.vue';
import TeamDropdown from '@/Comp/Navigation/TeamDropdown.vue';
import Navbar from '@/Comp/Navigation/Navbar.vue';
import Alert from '@/Comp/Alert.vue';
import { useStore } from 'vuex'

const store = useStore();
const showingNavigationDropdown = ref(false);

const navOpen = ref(false);

watchEffect(() =>{
    const { flash } = usePage().props
    if(flash.alert){
        store.commit('addAlert', flash.alert)
    }
    //store.commit('addAlert', {type: 'Success'})
})

watch(navOpen, (value) => {
    if(value){
        document.body.classList.add('overflow-hidden')
        document.body.classList.add('md:overflow-auto')
    } else{
        document.body.classList.remove('overflow-hidden')
        document.body.classList.remove('md:overflow-auto')
    }
})

const props = defineProps({
    title: String
});

onMounted(() =>{
    document.body.classList.remove('overflow-hidden')
    document.body.classList.remove('md:overflow-auto')
})

router.on('finish', () =>{
    document.body.classList.remove('overflow-hidden')
    document.body.classList.remove('md:overflow-auto')
})

</script>

<template>
    <Head :title="title" />
    <div class="main-grid relative" :class="[navOpen ? 'open' : '']">
        <div class="absolute top-4 right-4 gap-2 items-center hidden md:flex">
            <team-dropdown />
            <notification-dropdown />
            <profile-dropdown />
        </div>
        <header class="relative hidden md:block">
            <navbar :navopen="navOpen" @toggleMenu="navOpen = !navOpen" />
        </header>
        <!-- MOBILE -->
        <header class="md:hidden">
            <MobileHeader :navopen="navOpen" @toggleMenu="navOpen = !navOpen" />
            <navbar :navopen="navOpen" @toggleMenu="navOpen = !navOpen"/>
        </header>
        <!--    -->
        <main class="pt-20 md:pt-12 px-2 md:px-4 lg:px-8 pb-4">
            <slot></slot>
        </main>
        <alert />
    </div>
</template>
<style scoped>

@media (min-width: 768px) {
    .main-grid{
        display: grid;
        grid-template-columns: 68px auto;
        transition: grid-template-columns 0.5s;
    }
}

.main-grid.open{
    grid-template-columns: 240px auto;
}
</style>