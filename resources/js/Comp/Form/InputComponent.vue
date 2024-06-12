<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'password', 'email', 'number', 'textarea'].includes(value)
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
    }
});

defineEmits(['update:modelValue']);

const input = ref(null);

const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });

const rows = ref(3)
</script>

<template>
    <div class="relative" :class="[label ? 'pt-4' : '']">
        <label class="absolute top-1.5 left-4 bg-secondary px-1.5 py-0" v-show="(label && !placeholder) || (label && placeholder && modelValue.length > 0)" :for="id">
            {{ label }}
        </label>
        <input
            :id="id"
            ref="input"
            class="border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            :type="type"
            :required="required"
            :readonly="readonly"
            spellcheck="false"
            v-if="type !== 'textarea'"
        >
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
            spellcheck="false"></textarea>
    </div>
</template>