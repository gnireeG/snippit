<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';
const props = defineProps({
    snippits: Object
})
</script>

<template>
    <AppLayout title="Snippit App">
        <div>
            <h1 class="heading-1">Hello {{ $page.props.auth.user.name }}</h1>
            <p class="text-lg mt-2">You are currently in the <b class="italic">{{ $page.props.auth.user.current_team.name }}</b> team!</p>
            <div class="mt-8 autogrid gap-4">
                <template v-for="snippit in snippits">
                    <SnippitCard :snippit="snippit" />
                </template>
            </div>
        </div>
    </AppLayout>
</template>
