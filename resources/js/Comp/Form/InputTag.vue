<template>
    <div class="relative" :class="[label ? 'pt-4' : '']">
        <label class="absolute top-1.5 left-4 bg-secondary px-1.5 py-0" v-show="(label && !placeholder) || (label && placeholder && (tagsLocal.length > 0 || inputVal.length > 0))" :for="id">
            {{ label }}
        </label>
        <div class="border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm  w-full flex gap-1 items-center px-4 flex-wrap">
            <input type="text" class="py-4 pl-0 bg-transparent border-0 w-full focus:border-0 focus:ring-0" :placeholder="placeholder" :id="id" v-model="inputVal" @keydown.enter="addTag">
            <div class="mb-4 flex gap-1 flex-wrap" v-if="tagsLocal.length > 0">
                <template v-for="tag in tagsLocal" >
                    <div class="rounded-md bg-primary px-1 py-0.5 flex gap-1 items-center">
                        <p>{{ tag }}</p>
                        <button :title="'Remove Tag ' + tag" @click="removeTag(tag)"><i class="bi bi-x"></i></button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
    label: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    },
    tags: {
        type: Object,
        default: []
    }
})
const inputVal = ref('')
const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

function addTag(){
    if(inputVal.value.length > 0){
        tagsLocal.value.push(inputVal.value)
        inputVal.value = ''
    }
}

function removeTag(tag){
    tagsLocal.value = tagsLocal.value.filter(t => t !== tag)

}

const tagsLocal = ref([])
onMounted(() => {
    tagsLocal.value = props.tags
})

watch(() => tagsLocal.value, (newVal) => {
    emit('update', newVal)
})

watch(() => props.tags, (newVal) => {
    tagsLocal.value = newVal
})

const emit = defineEmits(['update'])
</script>