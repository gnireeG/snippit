<template>
    <nav class="flex flex-col justify-between top-0 sticky h-screen bg-secondary overflow-hidden">
        <div class="relative">
            <div class="absolute top-4 right-[20px]">
                <button title="Toggle Navigation" @click="toggleMenu"><i class="bi bi-list text-3xl"></i></button>
            </div>
            <div class="flex flex-col gap-2 mt-20">
                <Navitem :expand="navopen" :routeName="'app'" icon="bi-house">Home</Navitem>
                <Navitem :expand="navopen" :routeName="'app.folders.index'" icon="bi-code-slash">Snippits</Navitem>
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
</template>

<script setup>
import Darkmodetoggle from '@/Comp/Navigation/Darkmodetoggle.vue';
import Navitem from '@/Comp/Navigation/Navitem.vue';
import ProfileLink from '@/Comp/Navigation/ProfileLink.vue';

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