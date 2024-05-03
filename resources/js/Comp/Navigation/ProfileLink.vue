<template>
    <div class="flex gap-2 items-center">
        <Link :href="route('profile.show')" v-if="$page.props.jetstream.managesProfilePhotos" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition flex-shrink-0">
            <img class="h-8 w-8 rounded-full object-cover" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
        </Link>
        <div :class="expand ? 'opacity-100' : 'opacity-0'" class="transition-opacity duration-500">
            <Link :href="route('profile.show')" class="whitespace-nowrap">{{ $page.props.auth.user.name }}</Link>
            <form @submit.prevent="logout">
                <button type="submit" class="text-sm dark:text-gray-400 text-gray-600 underline">Log Out</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { Link, router } from '@inertiajs/vue3'

const props = defineProps({
    expand: {
        type: Boolean,
        required: true
    }
})

const logout = () => {
    router.post(route('logout'));
};

</script>