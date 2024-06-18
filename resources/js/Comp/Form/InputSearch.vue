<template>
    <div class="relative" :class="[label ? 'pt-4' : '']">
        <label class="absolute top-1.5 left-4 bg-secondary px-1.5 py-0" v-show="(label && !placeholder) || (label && placeholder && displayName.length > 0)" :for="id">
            {{ label }}
        </label>
        <input
            :id="id"
            ref="input"
            class="border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full"
            v-model="displayName"
            :placeholder="placeholder"
            type="text"
            :required="required"
            :readonly="readonly"
            @focus="showDropdown = true"
            @focusout="hideDropDown"
            spellcheck="false"
        >
        <button v-if="selectedItem == null" class="absolute top-8 right-4 text-gray-400 text-xl" style="pointer-events: none;"><i class="bi bi-chevron-down"></i></button>
        <button title="Clear selection" v-else class="absolute top-8 right-4 text-gray-400 text-xl" @click="clear"><i class="bi bi-x"></i></button>
        <div class="absolute w-full bg-primary max-h-48 overflow-auto shadow-md z-10" v-if="showDropdown">
            <ul>
                <li v-for="item in choicesList"><button :title="'Select ' + item.name" class="bg-primary hover py-2 px-4 w-full text-left" @mousedown="select(item)">{{ item.name }}</button></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: null
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
    choices: {
        type: Object,
        required: true
    },
    modelValue: String
});

const choicesList = computed(() =>{
    return props.choices.filter(choice => choice.name.toLowerCase().includes(displayName.value.toLowerCase()));
})

const displayName = ref('')
const selectedItem = ref(null)

const showDropdown = ref(false)

function select(item){
    selectedItem.value = item
    emit('select', item)
}

function hideDropDown(){
    showDropdown.value = false
    if(selectedItem.value){
        displayName.value = selectedItem.value.name
    } else{
        displayName.value = ''
    }
    
}

function clear(){
    selectedItem.value = null
    displayName.value = ''
    emit('select', {id: null, name: ''})
}

const emit = defineEmits(['select']);

const input = ref(null);

const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
    displayName.value = props.choices.find(choice => choice.id == props.modelValue)?.name ?? ''
    selectedItem.value = props.choices.find(choice => choice.id == props.modelValue) ?? null
});

watch(() => props.modelValue, (value) => {
    displayName.value = props.choices.find(choice => choice.id == value)?.name ?? ''
})

defineExpose({ focus: () => input.value.focus() });
</script>