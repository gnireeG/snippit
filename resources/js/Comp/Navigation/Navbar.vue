<template>
    <nav class="hidden md:flex flex-col justify-between top-0 sticky h-screen bg-secondary overflow-hidden">
        <div class="relative">
            <div class="absolute top-4 right-[20px]">
                <button title="Toggle Navigation" @click="toggleMenu"><i class="bi bi-list text-3xl"></i></button>
            </div>
            <div class="flex flex-col gap-2 mt-20">
                <Navitem :expand="navopen" :routeName="'app'" icon="bi-house">Home</Navitem>
                <Navitem :expand="navopen" :routeName="'app.folders.index'" icon="bi-code-slash">Snippits</Navitem>
                <Navitem :expand="navopen" :routeName="'app.search'" icon="bi-search">Search</Navitem>
                <Navitem :expand="navopen" :routeName="'app.teams'" icon="bi-people">Teams</Navitem>

            </div>
        </div>
        
        <div class="flex flex-col">
            <div class="p-4">
                <Darkmodetoggle :expand="navopen" />
            </div>
            <!-- <hr class="separator">
            <div class="p-4">
                <ProfileLink :expand="navopen" />
            </div> -->
        </div>
    </nav>
    <nav class="fixed w-screen h-screen z-20 bg-secondary" v-if="navopen">
        <div class="flex flex-col pt-20">
            <Link class="text-xl p-2 hover:bg-primary" :class="{'bg-primary' : route().current('app')}" :href="route('app')"><i class="bi bi-house"></i>&nbsp;Home</Link>
            <Link class="text-xl p-2 hover:bg-primary" :class="{'bg-primary' : route().current('app.folders.index')}" :href="route('app.folders.index')"><i class="bi bi-code-slash"></i>&nbsp;Snippits</Link>
            <Link class="text-xl p-2 hover:bg-primary" :class="{'bg-primary' : route().current('app.search')}" :href="route('app.search')"><i class="bi bi-search"></i>&nbsp;Search</Link>
            <Link class="text-xl p-2 hover:bg-primary" :class="{'bg-primary' : route().current('app.teams')}" :href="route('app.teams')"><i class="bi bi-people"></i>&nbsp;Teams</Link>
        </div>
    </nav>
</template>

<script setup>
import Darkmodetoggle from '@/Comp/Navigation/Darkmodetoggle.vue';
import Navitem from '@/Comp/Navigation/Navitem.vue';
import ProfileLink from '@/Comp/Navigation/ProfileLink.vue';
import { Link } from '@inertiajs/vue3';
const props = defineProps({
    navopen: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['toggleMenu']);

function toggleMenu(){
    emit('toggleMenu');
}
</script>