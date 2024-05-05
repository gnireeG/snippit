<script setup>
import Modal from './Modal.vue';

const emit = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
});

const close = () => {
    emit('close');
};
</script>

<template>
    <Modal
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
    >
        <div class="px-6 py-4 bg-primary">
            <div class="text-lg font-medium flex justify-between gap-4">
                <slot name="title" />
                <button @click="close" title="Close Dialog"><i class="bi bi-x-circle"></i></button>
            </div>

            <div class="mt-4 text-sm overflow-hidden">
                <slot name="content" />
            </div>
        </div>

        <div class="flex flex-row justify-end px-6 py-4 text-end bg-secondary items-center gap-4">
            <slot name="footer" />
        </div>
    </Modal>
</template>
