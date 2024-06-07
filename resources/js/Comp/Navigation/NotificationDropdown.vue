<template>
    <Dropdown align="right" width="48">
        <template #trigger>
            <button title="Open Notifications" class="btn btn-icon btn-transparent btn-lg"><i class="bi bi-bell"></i></button>
        </template>
        <template #content>
            <div class="p-4">
                <p v-if="notifications.length === 0" class="text-sm text-center">No new Notifications.</p>
            </div>
        </template>
    </Dropdown>
</template>
<script setup>
import { ref } from 'vue';
import Dropdown from '@/Components/Dropdown.vue';

const notifications = ref([]);
</script>