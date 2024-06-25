<template>
    <div>
        <button :title="show ? 'Hide' : 'Show'" @click="toggle" class="relative">
            <span class="pr-6">{{ title }}</span>
            <span :class="{'rotate-180': show}" class="transition-transform duration-300 absolute right-0">
                <i class="bi bi-chevron-down"></i>
            </span>
        </button>
        <template v-if="show">
            <slot></slot>
        </template>
    </div>
</template>
<script setup>

defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false}
})

const emit = defineEmits(['toggle'])

function toggle(){
    emit('toggle')
}

</script>