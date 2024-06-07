<template>
    <div class="fixed top-0 w-screen p-4 bg-secondary flex justify-between items-center z-30 transition-all duration-300 drop-shadow-md" 
         :class="{'translate-y-0': showHeader, '-translate-y-full': !showHeader}">
        <button @click="emit('toggleMenu')"><i class="bi bi-list text-3xl"></i></button>
        <div class="flex gap-2 items-center">
            <notification-dropdown />
            <profile-dropdown />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProfileDropdown from '@/Comp/Navigation/ProfileDropdown.vue';
import NotificationDropdown from '@/Comp/Navigation/NotificationDropdown.vue';
import TeamDropdown from '@/Comp/Navigation/TeamDropdown.vue';
import { router } from '@inertiajs/vue3'

let lastScrollPosition = 0;
const showHeader = ref(true);

const checkScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < lastScrollPosition || currentScrollPosition <= 60) {
        showHeader.value = true;
    } else {
        showHeader.value = false;
    }
    lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
};

onMounted(() => {
    window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
});

router.on('finish', () =>{
    lastScrollPosition = 99999;
    showHeader.value = true;
})

const props = defineProps({
    navopen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggleMenu']);
</script>

<style scoped>
.translate-y-0 {
    transform: translateY(0);
}
.-translate-y-full {
    transform: translateY(-100%);
}
</style>