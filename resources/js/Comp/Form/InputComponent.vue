<script setup>
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'password', 'email', 'number', 'textarea', 'search'].includes(value)
    },
    placeholder: {
        type: String,
        default: null
    },
    required: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    bgClass: {
        type: String,
        default: 'bg-secondary'
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
});

defineEmits(['update:modelValue', 'enter']);

const input = ref(null);

const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });

const classes = computed(() =>{
    let str = ''
    if (props.size === 'sm') str += 'px-3 py-2 text-sm '
    if (props.size === 'md') str += 'px-4 py-4 '
    if (props.size === 'lg') str += 'px-6 py-6 text-xl '
    if(props.type === 'search') str += 'pl-9'
    return str
})

const rows = ref(3)
</script>
<style scoped>
.search-input::-webkit-search-cancel-button{
    display: none;   
}
</style>
<template>
    <div class="relative" :class="[label ? 'pt-4' : '']">
        <label class="absolute top-1.5 left-4 px-1.5 py-0" :class="bgClass" v-show="(label && !placeholder) || (label && placeholder && modelValue.length > 0)" :for="id">
            {{ label }}
        </label>
        <input
            :id="id"
            ref="input"
            class="border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm w-full search-input"
            :class="[classes]"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown.enter="$emit('enter')"
            :placeholder="placeholder"
            :type="type"
            :required="required"
            :readonly="readonly"
            spellcheck="false"
            :autofocus="autofocus"
            v-if="type !== 'textarea'"
        >
        <div v-if="type === 'search'" class="absolute left-3" :class="[size === 'sm' ? 'top-2' : size === 'md' ? 'top-4' : size === 'lg' ? 'top-7' : '']">
            <i class="bi bi-search text-gray-400 dark:text-gray-500"></i>
        </div>
        <textarea
            v-if="type === 'textarea'"
            :id="id"
            ref="input"
            class="border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            :type="type"
            :rows="rows"
            :required="required"
            :readonly="readonly"
            :value="modelValue"
            spellcheck="false"></textarea>
    </div>
</template>